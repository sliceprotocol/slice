import hre from "hardhat";

async function main() {
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0");
  const configuredToken = process.env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS;

  // Safety check
  if (!configuredToken) {
    throw new Error(
      "❌ NEXT_PUBLIC_STAKING_TOKEN_ADDRESS is missing from .env",
    );
  }

  console.log(`\n🚀 Deploying to Chain ID: ${chainId}`);

  // 1. Determine Staking Token
  let stakingTokenAddress = configuredToken;

  // The logic remains similar, but driven by the ENV variable now
  if (configuredToken === "DEPLOY_MOCK") {
    console.log("🧪 Environment requests Mock Token...");
    const mockToken = await hre.viem.deployContract("MockERC20", [
      "Slice Mock",
      "SLM",
    ]);
    stakingTokenAddress = mockToken.address;
    console.log(`✅ Mock Token Deployed: ${stakingTokenAddress}`);
  } else {
    console.log(`ℹ️ Using Configured Token: ${stakingTokenAddress}`);
  }

  // 2. Deploy Slice
  const slice = await hre.viem.deployContract("Slice", [stakingTokenAddress]);
  console.log(`🍕 Slice Deployed: ${slice.address}`);

  console.log("\n⚠️  IMPORTANT: UPDATE YOUR .ENV FILE NOW ⚠️");
  console.log(`NEXT_PUBLIC_SLICE_CONTRACT_ADDRESS="${slice.address}"`);
  console.log(`NEXT_PUBLIC_STAKING_TOKEN_ADDRESS="${stakingTokenAddress}"`);
}

main().catch(console.error);
