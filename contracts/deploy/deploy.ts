import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { parseUnits, Wallet } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`\n🚀 Deploying Slice to network: ${network.name}`);

  // --- 1. SETUP USDC ---
  const MOCK_USDC_ADDRESSES: Record<string, string> = {
    baseSepolia: "0x672B6F3A85d697195eCe0ef318924D034122B2bb",
    base: "0x6584C56bfE16b6F976c81a1Be25C5a29fD582519",
  };

  let usdcAddress = MOCK_USDC_ADDRESSES[network.name];
  if (network.name === "hardhat" || network.name === "localhost") {
    const mock = await deploy("MockUSDC", { from: deployer, args: [], log: true });
    usdcAddress = mock.address;
  }

  if (!usdcAddress) throw new Error("Missing USDC Address");

  // --- 2. MINT FUNDS (SMART CHECK) ---
  const signer = await ethers.getSigner(deployer);
  const usdc = await ethers.getContractAt("MockUSDC", usdcAddress, signer);

  try {
    const myBalance = await usdc.balanceOf(deployer);
    const mintAmount = parseUnits("10000", 6);

    if (myBalance < mintAmount) {
      console.log("   🔄 Balance low. Minting 10,000 USDC...");
      try {
        await (await (usdc as any).mint(deployer, mintAmount)).wait();
      } catch {
        await (await (usdc as any).mint(mintAmount)).wait();
      }
      console.log("   ✅ Mint Successful");
    } else {
      console.log("   Info: Deployer already has sufficient USDC. Skipping mint.");
    }
  } catch (e) {
    console.log("   ⚠️  Mint check failed/skipped");
  }

  // --- 3. DEPLOY SLICE ---
  const sliceDeploy = await deploy("Slice", {
    from: deployer,
    args: [usdcAddress],
    log: true,
    waitConfirmations: 1,
  });
  console.log(`✅ Slice deployed at: ${sliceDeploy.address}`);

  const slice = await ethers.getContractAt("Slice", sliceDeploy.address, signer);

  // --- 4. SEED DISPUTES ---
  if (process.env.SEED_DISPUTES === "true" || network.name === "hardhat" || network.name === "baseSepolia") {
    console.log("\n🌱 Seeding initial disputes...");

    // 1. Get Deployer Nonce
    let currentNonce = await signer.getNonce("pending");
    console.log(`   🔄 Starting Deployer Nonce: ${currentNonce}`);

    // 2. Setup Defender & Defender Nonce
    const defenderWallet = Wallet.createRandom().connect(ethers.provider);
    let defenderNonce = 0; // Starts at 0 for a fresh wallet
    console.log(`   🤖 Defender: ${defenderWallet.address}`);

    // 3. Fund Defender (ETH)
    console.log("   💸 Sending ETH to defender...");
    await (
      await signer.sendTransaction({
        to: defenderWallet.address,
        value: parseUnits("0.000005", 18),
        nonce: currentNonce++,
      })
    ).wait();

    // 4. Fund Defender (USDC)
    console.log("   💸 Sending USDC to defender...");
    await (await usdc.transfer(defenderWallet.address, parseUnits("500", 6), { nonce: currentNonce++ })).wait();

    // Data
    const ROOT_CID = "bafybeifa6gsnklvyvepp45ilf4ngc5o3ndydq7zxcdgrfybxs6flts6mdi";
    const disputes = [
      { title: "Freelance", category: "Freelance", ipfsHash: `${ROOT_CID}/freelance.json` },
      { title: "P2P Trade", category: "P2P Trade", ipfsHash: `${ROOT_CID}/p2p.json` },
      { title: "Marketplace", category: "Marketplace", ipfsHash: `${ROOT_CID}/marketplace.json` },
    ];

    const STAKE_AMOUNT = 1000000n; // 1 USDC
    const ONE_WEEK = 604800;

    for (const d of disputes) {
      console.log(`   Detailed Setup for: "${d.title}"`);

      // A. Approve (Claimer)
      await (await usdc.approve(slice.target, STAKE_AMOUNT, { nonce: currentNonce++ })).wait();

      // B. Create Dispute
      const tx = await slice.createDispute(
        {
          claimer: deployer,
          defender: defenderWallet.address,
          category: d.category,
          ipfsHash: d.ipfsHash,
          jurorsRequired: 1,
          paySeconds: ONE_WEEK,
          evidenceSeconds: ONE_WEEK,
          commitSeconds: ONE_WEEK,
          revealSeconds: ONE_WEEK,
        },
        { nonce: currentNonce++ },
      );

      const receipt = await tx.wait();

      // Find ID
      let disputeId = 0;
      for (const log of receipt!.logs) {
        if (log.address.toLowerCase() === sliceDeploy.address.toLowerCase()) {
          try {
            const parsed = slice.interface.parseLog(log);
            if (parsed && parsed.name === "DisputeCreated") {
              disputeId = Number(parsed.args[0]);
              break;
            }
          } catch (e) {}
        }
      }

      if (disputeId === 0) {
        console.error("❌ Could not find DisputeCreated event. Skipping payment.");
        continue;
      }
      console.log(`      ✅ Created Dispute #${disputeId}`);

      // C. Pay (Claimer)
      await (await slice.payDispute(disputeId, { nonce: currentNonce++ })).wait();
      console.log(`      💰 Claimer Paid`);

      // D. Pay (Defender) - WITH MANUAL DEFENDER NONCE
      const sliceDef = slice.connect(defenderWallet);
      const usdcDef = usdc.connect(defenderWallet);

      // D1. Approve
      await (
        await usdcDef.approve(
          slice.target,
          STAKE_AMOUNT,
          { nonce: defenderNonce++ }, // <--- Manual Defender Nonce
        )
      ).wait();

      // D2. Pay
      await (
        await sliceDef.payDispute(
          disputeId,
          { nonce: defenderNonce++ }, // <--- Manual Defender Nonce
        )
      ).wait();

      console.log(`      💰 Defender Paid -> Status: COMMIT`);
    }
  }

  // --- 5. VERIFY ---
  if (network.name !== "hardhat" && network.name !== "localhost" && process.env.BASESCAN_API_KEY) {
    try {
      await hre.run("verify:verify", { address: sliceDeploy.address, constructorArguments: [usdcAddress] });
    } catch (e) {}
  }
};

export default func;
func.tags = ["Slice"];
func.id = "deploy_slice_v1";
