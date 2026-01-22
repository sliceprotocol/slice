import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const usdcAddress: `0x${string}`  = "0x0000000000000000000000000000000000000000";

    console.log(`\n🚀 Deploying SliceFHE to network: ${network.name}`);
    const sliceFHEDeploy = await deploy("SliceFHE", {
        from: deployer,
        args: [usdcAddress],
        log: true,
        waitConfirmations: 1,
    });
    console.log(`✅ SliceFHE deployed at: ${sliceFHEDeploy.address}`);
}

export default func;
func.tags = ["SliceFHE"];