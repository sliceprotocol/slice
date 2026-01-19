import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // USDC addresses by network
  const USDC_ADDRESSES: Record<string, string> = {
    baseSepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia USDC
    base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet USDC
    hardhat: "", // Will deploy MockUSDC for local testing
    localhost: "", // Will deploy MockUSDC for local testing
  };

  const networkName = hre.network.name;
  let usdcAddress = USDC_ADDRESSES[networkName];

  // For local networks, deploy MockUSDC first
  if (!usdcAddress || networkName === "hardhat" || networkName === "localhost") {
    console.log("Deploying MockUSDC for local testing...");
    const mockUSDC = await deploy("MockUSDC", {
      from: deployer,
      args: [],
      log: true,
    });
    usdcAddress = mockUSDC.address;
    console.log(`MockUSDC deployed at: ${usdcAddress}`);
  }

  console.log(`Deploying Slice on ${networkName}...`);
  console.log(`Using USDC address: ${usdcAddress}`);

  const deployedSlice = await deploy("Slice", {
    from: deployer,
    args: [usdcAddress],
    log: true,
  });

  console.log(`Slice contract deployed at: ${deployedSlice.address}`);
};

export default func;
func.id = "deploy_slice";
func.tags = ["Slice"];
