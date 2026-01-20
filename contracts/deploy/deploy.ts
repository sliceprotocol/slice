import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { parseUnits } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // 🛑 Helper: Wait for N milliseconds
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const RPC_DELAY = 5000; // 5 second pause between actions

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

  // --- 2. CHECK & MINT FUNDS ---
  const signer = await ethers.getSigner(deployer);
  const usdc = await ethers.getContractAt("MockUSDC", usdcAddress, signer);

  if (network.name === "hardhat" || network.name === "localhost" || network.name === "baseSepolia") {
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
        await delay(RPC_DELAY); // Pause after mint
      }
    } catch (e) {
      console.log("   ⚠️  Mint check failed/skipped");
    }
  }

  // --- 3. DEPLOY SLICE ---
  const sliceDeploy = await deploy("Slice", {
    from: deployer,
    args: [usdcAddress],
    log: true,
    waitConfirmations: 1,
  });
  console.log(`✅ Slice deployed at: ${sliceDeploy.address}`);

  await delay(RPC_DELAY); // Pause after deploy

  const slice = await ethers.getContractAt("Slice", sliceDeploy.address, signer);

  // --- 4. SEED DISPUTES ---
  const shouldSeed =
    process.env.SEED_DISPUTES === "true" || network.name === "hardhat" || network.name === "baseSepolia";

  if (shouldSeed) {
    console.log("\n🌱 Seeding initial disputes...");

    // Wait for indexing
    console.log("   ⏳ Waiting 10s for network indexing...");
    await delay(10000);

    const signers = await ethers.getSigners();
    const defenderWallet = signers[1];

    if (!defenderWallet) {
      throw new Error("Defender account not found.");
    }
    console.log(`   🤖 Defender: ${defenderWallet.address}`);

    // Fund Defender (ETH)
    const defenderBalance = await ethers.provider.getBalance(defenderWallet.address);
    if (defenderBalance < parseUnits("0.00001", 18)) {
      console.log("   💸 Sending ETH to defender...");
      await (
        await signer.sendTransaction({
          to: defenderWallet.address,
          value: parseUnits("0.00005", 18),
        })
      ).wait();
      await delay(RPC_DELAY); // Pause after funding ETH
    }

    // Fund Defender (USDC)
    const defenderUSDC = await usdc.balanceOf(defenderWallet.address);
    if (defenderUSDC < parseUnits("100", 6)) {
      console.log("   💸 Sending USDC to defender...");
      await (await usdc.transfer(defenderWallet.address, parseUnits("500", 6))).wait();
      await delay(RPC_DELAY); // Pause after funding USDC
    }

    const ROOT_CID = "bafybeifa6gsnklvyvepp45ilf4ngc5o3ndydq7zxcdgrfybxs6flts6mdi";
    const disputes = [
      { title: "Freelance", category: "Freelance", ipfsHash: `${ROOT_CID}/freelance.json` },
      { title: "P2P Trade", category: "P2P Trade", ipfsHash: `${ROOT_CID}/p2p.json` },
      { title: "Marketplace", category: "Marketplace", ipfsHash: `${ROOT_CID}/marketplace.json` },
    ];

    const STAKE_AMOUNT = 1000000n; // 1 USDC
    const ONE_WEEK = 604800;

    const sliceDef = slice.connect(defenderWallet);
    const usdcDef = usdc.connect(defenderWallet);

    for (const d of disputes) {
      console.log(`   Detailed Setup for: "${d.title}"`);

      // ---------------------------------------------------------
      // A. CLAIMER ACTIONS
      // ---------------------------------------------------------

      console.log("     ... Claimer Approving");
      const approveTx = await usdc.approve(slice.target, STAKE_AMOUNT);
      await approveTx.wait();
      await delay(RPC_DELAY); // <--- DELAY ADDED

      console.log("     ... Claimer Creating Dispute");
      const createTx = await slice.createDispute({
        claimer: deployer,
        defender: defenderWallet.address,
        category: d.category,
        ipfsHash: d.ipfsHash,
        jurorsRequired: 1n,
        paySeconds: ONE_WEEK,
        evidenceSeconds: ONE_WEEK,
        commitSeconds: ONE_WEEK,
        revealSeconds: ONE_WEEK,
      });
      const receipt = await createTx.wait();
      await delay(RPC_DELAY); // <--- DELAY ADDED

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
      console.log(`       ✅ Created Dispute #${disputeId}`);

      console.log("     ... Claimer Paying");
      const payClaimerTx = await slice.payDispute(disputeId);
      await payClaimerTx.wait();
      await delay(RPC_DELAY); // <--- DELAY ADDED
      console.log(`       💰 Claimer Paid`);

      // ---------------------------------------------------------
      // B. DEFENDER ACTIONS
      // ---------------------------------------------------------

      console.log(`     ... Defender Approving`);
      const defApproveTx = await usdcDef.approve(slice.target, STAKE_AMOUNT);
      await defApproveTx.wait();
      await delay(RPC_DELAY); // <--- DELAY ADDED

      console.log(`     ... Defender Paying`);
      const defPayTx = await sliceDef.payDispute(disputeId);
      await defPayTx.wait();
      await delay(RPC_DELAY); // <--- DELAY ADDED

      console.log(`       💰 Defender Paid -> Status: COMMIT`);
    }
  }

  // --- 5. VERIFY ---
  if (network.name !== "hardhat" && network.name !== "localhost" && process.env.BASESCAN_API_KEY) {
    console.log("   Verifying contract...");
    try {
      await hre.run("verify:verify", { address: sliceDeploy.address, constructorArguments: [usdcAddress] });
    } catch (e) {
      console.log("   Verification skipped or failed.");
    }
  }
};

export default func;
func.tags = ["Slice"];
func.id = "deploy_slice_v1";
