import { ethers, fhevm } from "hardhat";
import { MockUSDC, MockUSDC__factory, SliceFHE, SliceFHE__factory } from "../types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

type Signers = {
    deployer: HardhatEthersSigner;
    alice: HardhatEthersSigner;
    bob: HardhatEthersSigner;
};

async function deployFixture() {
    // Deploy mock USDC
    const mockUSDCFactory = (await ethers.getContractFactory("MockUSDC")) as MockUSDC__factory;
    const mockUSDCContract = (await mockUSDCFactory.deploy()) as MockUSDC;
    const mockUSDCAddress = await mockUSDCContract.getAddress();

    const factory = (await ethers.getContractFactory("SliceFHE")) as SliceFHE__factory;
    const sliceFHEContract = (await factory.deploy(mockUSDCAddress)) as SliceFHE;
    const sliceFHEContractAddress = await sliceFHEContract.getAddress();

    return { sliceFHEContract, sliceFHEContractAddress, mockUSDCContract, mockUSDCAddress };
}

describe("SliceFHE", function () {
    let signers: Signers;
    let sliceFHEContract: SliceFHE;
    let sliceFHEContractAddress: string;
    let mockUSDCContract: MockUSDC;
    let mockUSDCAddress: string;

    before(async function () {
        const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
        signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
    });

    beforeEach(async function () {
        // Check whether the tests are running against an FHEVM mock environment
        if (!fhevm?.isMock) {
            console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
            this.skip();
        }
    
        ({ sliceFHEContract, sliceFHEContractAddress, mockUSDCContract, mockUSDCAddress } = await deployFixture());
    });




});