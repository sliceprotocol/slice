import { ethers, fhevm, network } from "hardhat";
import { MockUSDC, MockUSDC__factory, SliceFHE, SliceFHE__factory } from "../types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";

type Signers = {
    deployer: HardhatEthersSigner;
    alice: HardhatEthersSigner;   // claimer
    bob: HardhatEthersSigner;     // defender
    juror1: HardhatEthersSigner;
    juror2: HardhatEthersSigner;
    juror3: HardhatEthersSigner;
};

// Constants for testing
const STAKE_PER_JUROR = ethers.parseUnits("10", 6); // 10 USDC (6 decimals)
const MINT_AMOUNT = ethers.parseUnits("1000", 6);   // 1000 USDC per account
const ONE_DAY = 86400;
const ONE_WEEK = 604800;

// Helper: Create a valid DisputeConfig
function createValidDisputeConfig(
    claimer: string,
    defender: string,
    jurorsRequired: number = 1
): SliceFHE.DisputeConfigStruct {
    return {
        claimer,
        defender,
        jurorsRequired,
        paySeconds: ONE_DAY,
        evidenceSeconds: ONE_DAY,
        commitSeconds: ONE_WEEK,
        revealSeconds: ONE_DAY,
    };
}

// Helper: Advance blockchain time
async function advanceTime(seconds: number): Promise<void> {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
}

// Helper: Get current block timestamp
async function getBlockTimestamp(): Promise<number> {
    const block = await ethers.provider.getBlock("latest");
    return block!.timestamp;
}

async function deployFixture(signers: Signers) {
    // Deploy mock USDC
    const mockUSDCFactory = (await ethers.getContractFactory("MockUSDC")) as MockUSDC__factory;
    const mockUSDCContract = (await mockUSDCFactory.deploy()) as MockUSDC;
    const mockUSDCAddress = await mockUSDCContract.getAddress();

    // Deploy SliceFHE
    const factory = (await ethers.getContractFactory("SliceFHE")) as SliceFHE__factory;
    const sliceFHEContract = (await factory.deploy(mockUSDCAddress)) as SliceFHE;
    const sliceFHEContractAddress = await sliceFHEContract.getAddress();

    // Set stake per juror
    await sliceFHEContract.setStakePerJuror(STAKE_PER_JUROR);

    // Mint tokens to all signers
    const allSigners = [signers.deployer, signers.alice, signers.bob, signers.juror1, signers.juror2, signers.juror3];
    for (const signer of allSigners) {
        await mockUSDCContract.mint(signer.address, MINT_AMOUNT);
        await mockUSDCContract.connect(signer).approve(sliceFHEContractAddress, ethers.MaxUint256);
    }

    return { sliceFHEContract, sliceFHEContractAddress, mockUSDCContract, mockUSDCAddress };
}

// Helper: Setup a juror with staked tokens
async function setupStakedJuror(
    sliceFHEContract: SliceFHE,
    juror: HardhatEthersSigner,
    amount: bigint = STAKE_PER_JUROR
): Promise<void> {
    await sliceFHEContract.connect(juror).stake(amount);
}

// Helper: Create a dispute and return its ID
async function createDisputeHelper(
    sliceFHEContract: SliceFHE,
    creator: HardhatEthersSigner,
    claimer: string,
    defender: string,
    jurorsRequired: number = 1
): Promise<bigint> {
    const config = createValidDisputeConfig(claimer, defender, jurorsRequired);
    const tx = await sliceFHEContract.connect(creator).createDispute(config);
    const receipt = await tx.wait();
    
    // Get dispute ID from event
    const event = receipt?.logs.find(
        (log) => sliceFHEContract.interface.parseLog(log as any)?.name === "DisputeCreated"
    );
    const parsedEvent = sliceFHEContract.interface.parseLog(event as any);
    return parsedEvent?.args.id;
}

describe("SliceFHE", function () {
    let signers: Signers;
    let sliceFHEContract: SliceFHE;
    let sliceFHEContractAddress: string;
    let mockUSDCContract: MockUSDC;
    let mockUSDCAddress: string;

    before(async function () {
        const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
        signers = {
            deployer: ethSigners[0],
            alice: ethSigners[1],
            bob: ethSigners[2],
            juror1: ethSigners[3],
            juror2: ethSigners[4],
            juror3: ethSigners[5],
        };
    });

    beforeEach(async function () {
        // Check whether the tests are running against an FHEVM mock environment
        if (!fhevm?.isMock) {
            console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
            this.skip();
        }
    
        ({ sliceFHEContract, sliceFHEContractAddress, mockUSDCContract, mockUSDCAddress } = await deployFixture(signers));
    });

    // =========================================
    // =       Constructor Tests              =
    // =========================================
    describe("Constructor", function () {
        it("should set the staking token correctly", async function () {
            expect(await sliceFHEContract.stakingToken()).to.equal(mockUSDCAddress);
        });

        it("should set the owner correctly", async function () {
            expect(await sliceFHEContract.owner()).to.equal(signers.deployer.address);
        });

        it("should initialize disputeCount to 0", async function () {
            expect(await sliceFHEContract.disputeCount()).to.equal(0);
        });

        it("should set stakePerJuror correctly", async function () {
            expect(await sliceFHEContract.stakePerJuror()).to.equal(STAKE_PER_JUROR);
        });
    });

    // =========================================
    // =       Staking Tests                  =
    // =========================================
    describe("stake()", function () {
        it("should allow users to stake tokens", async function () {
            const stakeAmount = ethers.parseUnits("100", 6);
            await sliceFHEContract.connect(signers.alice).stake(stakeAmount);
            
            const stats = await sliceFHEContract.userStats(signers.alice.address);
            expect(stats.totalStaked).to.equal(stakeAmount);
        });

        it("should revert if amount is 0", async function () {
            await expect(
                sliceFHEContract.connect(signers.alice).stake(0)
            ).to.be.revertedWith("Amount must be greater than 0");
        });

        it("should emit Staked event", async function () {
            const stakeAmount = ethers.parseUnits("50", 6);
            await expect(sliceFHEContract.connect(signers.alice).stake(stakeAmount))
                .to.emit(sliceFHEContract, "Staked")
                .withArgs(signers.alice.address, stakeAmount);
        });

        it("should transfer tokens from user to contract", async function () {
            const stakeAmount = ethers.parseUnits("100", 6);
            const balanceBefore = await mockUSDCContract.balanceOf(signers.alice.address);
            
            await sliceFHEContract.connect(signers.alice).stake(stakeAmount);
            
            const balanceAfter = await mockUSDCContract.balanceOf(signers.alice.address);
            expect(balanceBefore - balanceAfter).to.equal(stakeAmount);
        });

        it("should accumulate stakes correctly", async function () {
            const firstStake = ethers.parseUnits("50", 6);
            const secondStake = ethers.parseUnits("30", 6);
            
            await sliceFHEContract.connect(signers.alice).stake(firstStake);
            await sliceFHEContract.connect(signers.alice).stake(secondStake);
            
            const stats = await sliceFHEContract.userStats(signers.alice.address);
            expect(stats.totalStaked).to.equal(firstStake + secondStake);
        });
    });

    // =========================================
    // =       Withdrawal Tests               =
    // =========================================
    describe("withdraw()", function () {
        it("should allow users to withdraw available stake", async function () {
            const stakeAmount = ethers.parseUnits("100", 6);
            await sliceFHEContract.connect(signers.alice).stake(stakeAmount);
            
            const balanceBefore = await mockUSDCContract.balanceOf(signers.alice.address);
            await sliceFHEContract.connect(signers.alice).withdraw();
            const balanceAfter = await mockUSDCContract.balanceOf(signers.alice.address);
            
            expect(balanceAfter - balanceBefore).to.equal(stakeAmount);
        });

        it("should revert if no stake exists", async function () {
            await expect(
                sliceFHEContract.connect(signers.alice).withdraw()
            ).to.be.revertedWith("No staked");
        });

        it("should emit Withdrawn event", async function () {
            const stakeAmount = ethers.parseUnits("100", 6);
            await sliceFHEContract.connect(signers.alice).stake(stakeAmount);
            
            await expect(sliceFHEContract.connect(signers.alice).withdraw())
                .to.emit(sliceFHEContract, "Withdrawn")
                .withArgs(signers.alice.address, stakeAmount);
        });

        it("should not allow withdrawing stake locked in disputes", async function () {
            // Setup: stake tokens and join a dispute
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            
            // Create dispute
            const disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            
            // Join dispute (locks STAKE_PER_JUROR)
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            
            // Should only be able to withdraw the unlocked portion
            const balanceBefore = await mockUSDCContract.balanceOf(signers.juror1.address);
            await sliceFHEContract.connect(signers.juror1).withdraw();
            const balanceAfter = await mockUSDCContract.balanceOf(signers.juror1.address);
            
            // Only STAKE_PER_JUROR should be withdrawable (the other is locked)
            expect(balanceAfter - balanceBefore).to.equal(STAKE_PER_JUROR);
        });
    });

    // =========================================
    // =       Create Dispute Tests           =
    // =========================================
    describe("createDispute()", function () {
        it("should create a dispute with valid config", async function () {
            const config = createValidDisputeConfig(signers.alice.address, signers.bob.address, 1);
            
            await expect(sliceFHEContract.connect(signers.alice).createDispute(config))
                .to.emit(sliceFHEContract, "DisputeCreated")
                .withArgs(1, signers.alice.address, signers.bob.address);
            
            expect(await sliceFHEContract.disputeCount()).to.equal(1);
        });

        it("should revert if claimer is zero address", async function () {
            const config = createValidDisputeConfig(ethers.ZeroAddress, signers.bob.address, 1);
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Claimer cannot be 0 address");
        });

        it("should revert if defender is zero address", async function () {
            const config = createValidDisputeConfig(signers.alice.address, ethers.ZeroAddress, 1);
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Defender cannot be 0 address");
        });

        it("should revert if paySeconds is 0", async function () {
            const config = {
                ...createValidDisputeConfig(signers.alice.address, signers.bob.address),
                paySeconds: 0,
            };
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Pay seconds must be greater than 0");
        });

        it("should revert if evidenceSeconds is 0", async function () {
            const config = {
                ...createValidDisputeConfig(signers.alice.address, signers.bob.address),
                evidenceSeconds: 0,
            };
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Evidence seconds must be greater than 0");
        });

        it("should revert if commitSeconds is 0", async function () {
            const config = {
                ...createValidDisputeConfig(signers.alice.address, signers.bob.address),
                commitSeconds: 0,
            };
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Commit seconds must be greater than 0");
        });

        it("should revert if revealSeconds is 0", async function () {
            const config = {
                ...createValidDisputeConfig(signers.alice.address, signers.bob.address),
                revealSeconds: 0,
            };
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Reveal seconds must be greater than 0");
        });

        it("should revert if jurorsRequired is 0", async function () {
            const config = createValidDisputeConfig(signers.alice.address, signers.bob.address, 0);
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Jurors required must be greater than 0");
        });

        it("should revert for self-dispute (msg.sender is defender)", async function () {
            const config = createValidDisputeConfig(signers.alice.address, signers.alice.address, 1);
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Self-dispute not allowed");
        });

        it("should revert if claimer equals defender", async function () {
            const config = createValidDisputeConfig(signers.bob.address, signers.bob.address, 1);
            
            await expect(
                sliceFHEContract.connect(signers.alice).createDispute(config)
            ).to.be.revertedWith("Claimer cannot be Defender");
        });

        it("should transfer stake from creator", async function () {
            const jurorsRequired = 2;
            const config = createValidDisputeConfig(signers.alice.address, signers.bob.address, jurorsRequired);
            const expectedStake = STAKE_PER_JUROR * BigInt(jurorsRequired);
            
            const balanceBefore = await mockUSDCContract.balanceOf(signers.alice.address);
            await sliceFHEContract.connect(signers.alice).createDispute(config);
            const balanceAfter = await mockUSDCContract.balanceOf(signers.alice.address);
            
            expect(balanceBefore - balanceAfter).to.equal(expectedStake);
        });

        it("should increment disputeCount", async function () {
            const config = createValidDisputeConfig(signers.alice.address, signers.bob.address, 1);
            
            expect(await sliceFHEContract.disputeCount()).to.equal(0);
            await sliceFHEContract.connect(signers.alice).createDispute(config);
            expect(await sliceFHEContract.disputeCount()).to.equal(1);
            await sliceFHEContract.connect(signers.alice).createDispute(config);
            expect(await sliceFHEContract.disputeCount()).to.equal(2);
        });

        it("should set dispute status to Created", async function () {
            const config = createValidDisputeConfig(signers.alice.address, signers.bob.address, 1);
            await sliceFHEContract.connect(signers.alice).createDispute(config);
            
            const dispute = await sliceFHEContract.disputes(1);
            expect(dispute.status).to.equal(0); // DisputeStatus.Created
        });
    });

    // =========================================
    // =       Submit Evidence Tests          =
    // =========================================
    describe("submitEvidence()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
        });

        it("should allow claimer to submit evidence", async function () {
            const ipfsHash = "QmTest123";
            
            await expect(sliceFHEContract.connect(signers.alice).submitEvidence(disputeId, ipfsHash))
                .to.emit(sliceFHEContract, "EvidenceSubmitted")
                .withArgs(disputeId, signers.alice.address, ipfsHash);
        });

        it("should allow defender to submit evidence", async function () {
            const ipfsHash = "QmTest456";
            
            await expect(sliceFHEContract.connect(signers.bob).submitEvidence(disputeId, ipfsHash))
                .to.emit(sliceFHEContract, "EvidenceSubmitted")
                .withArgs(disputeId, signers.bob.address, ipfsHash);
        });

        it("should revert if not claimer or defender", async function () {
            await expect(
                sliceFHEContract.connect(signers.juror1).submitEvidence(disputeId, "QmTest")
            ).to.be.revertedWith("Not allowed to submit evidence");
        });

        it("should revert if dispute not in Created status", async function () {
            // Setup: stake juror and join, then start voting
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.startVotingPhase(disputeId);
            
            await expect(
                sliceFHEContract.connect(signers.alice).submitEvidence(disputeId, "QmTest")
            ).to.be.revertedWith("Dispute not created");
        });

        it("should revert if evidence deadline passed", async function () {
            // Advance time past evidence deadline
            await advanceTime(ONE_DAY + 1);
            
            await expect(
                sliceFHEContract.connect(signers.alice).submitEvidence(disputeId, "QmTest")
            ).to.be.revertedWith("Evidence deadline passed");
        });

        it("should update ipfsHash on dispute", async function () {
            const ipfsHash = "QmTestHash789";
            await sliceFHEContract.connect(signers.alice).submitEvidence(disputeId, ipfsHash);
            
            const dispute = await sliceFHEContract.disputes(disputeId);
            expect(dispute.ipfsHash).to.equal(ipfsHash);
        });
    });

    // =========================================
    // =       Join Dispute Tests             =
    // =========================================
    describe("joinDispute()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                2 // Require 2 jurors
            );
        });

        it("should allow juror to join dispute", async function () {
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            
            await expect(sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0))
                .to.emit(sliceFHEContract, "JurorJoined")
                .withArgs(disputeId, signers.juror1.address);
        });

        it("should revert if dispute not in Created status", async function () {
            // Setup: get all jurors to join and start voting
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId, 0);
            await sliceFHEContract.startVotingPhase(disputeId);
            
            await setupStakedJuror(sliceFHEContract, signers.juror3, STAKE_PER_JUROR * 2n);
            await expect(
                sliceFHEContract.connect(signers.juror3).joinDispute(disputeId, 0)
            ).to.be.revertedWith("Dispute not created");
        });

        it("should revert if jurors required already reached", async function () {
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR * 2n);
            await setupStakedJuror(sliceFHEContract, signers.juror3, STAKE_PER_JUROR * 2n);
            
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId, 0);
            
            await expect(
                sliceFHEContract.connect(signers.juror3).joinDispute(disputeId, 0)
            ).to.be.revertedWith("Jurors required reached");
        });

        it("should revert if claimer tries to join", async function () {
            await setupStakedJuror(sliceFHEContract, signers.alice, STAKE_PER_JUROR * 2n);
            
            await expect(
                sliceFHEContract.connect(signers.alice).joinDispute(disputeId, 0)
            ).to.be.revertedWith("Not allowed to join dispute");
        });

        it("should revert if defender tries to join", async function () {
            await setupStakedJuror(sliceFHEContract, signers.bob, STAKE_PER_JUROR * 2n);
            
            await expect(
                sliceFHEContract.connect(signers.bob).joinDispute(disputeId, 0)
            ).to.be.revertedWith("Not allowed to join dispute");
        });

        it("should revert if insufficient stake", async function () {
            // Stake less than required
            await sliceFHEContract.connect(signers.juror1).stake(STAKE_PER_JUROR);
            
            await expect(
                sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0)
            ).to.be.revertedWith("Not enough staked");
        });

        it("should update stakeInDisputes", async function () {
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            
            const stats = await sliceFHEContract.userStats(signers.juror1.address);
            expect(stats.stakeInDisputes).to.equal(STAKE_PER_JUROR * 2n);
        });

        it("should add juror to dispute jurors array", async function () {
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            
            const jurors = await sliceFHEContract.getJurors(disputeId);
            expect(jurors).to.include(signers.juror1.address);
        });
    });

    // =========================================
    // =       Start Voting Phase Tests       =
    // =========================================
    describe("startVotingPhase()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
        });

        it("should transition to Voting status", async function () {
            await expect(sliceFHEContract.startVotingPhase(disputeId))
                .to.emit(sliceFHEContract, "StatusChanged")
                .withArgs(disputeId, 1); // DisputeStatus.Voting
            
            const dispute = await sliceFHEContract.disputes(disputeId);
            expect(dispute.status).to.equal(1);
        });

        it("should revert if not in Created status", async function () {
            await sliceFHEContract.startVotingPhase(disputeId);
            
            await expect(
                sliceFHEContract.startVotingPhase(disputeId)
            ).to.be.revertedWith("Dispute not in created status");
        });

        it("should revert if not all jurors joined", async function () {
            // Create a dispute requiring 2 jurors but only 1 joined
            const disputeId2 = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                2
            );
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId2, 0);
            
            await expect(
                sliceFHEContract.startVotingPhase(disputeId2)
            ).to.be.revertedWith("Not all jurors joined");
        });
    });

    // =========================================
    // =       Commit Vote Tests (FHE)        =
    // =========================================
    describe("commitVote()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.startVotingPhase(disputeId);
        });

        it("should allow juror to commit encrypted vote (true)", async function () {
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror1)
                    .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof)
            ).to.emit(sliceFHEContract, "VoteCommitted")
                .withArgs(disputeId, signers.juror1.address);
        });

        it("should allow juror to commit encrypted vote (false)", async function () {
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(false)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror1)
                    .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof)
            ).to.emit(sliceFHEContract, "VoteCommitted");
        });

        it("should revert if dispute not in Voting status", async function () {
            // Create new dispute that hasn't started voting
            const disputeId2 = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );

            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror1)
                    .commitVote(disputeId2, encryptedVote.handles[0], encryptedVote.inputProof)
            ).to.be.revertedWith("Dispute not voting");
        });

        it("should revert if commit deadline passed", async function () {
            await advanceTime(ONE_WEEK + 1);

            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror1)
                    .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof)
            ).to.be.revertedWith("Commit deadline passed");
        });

        it("should revert if not a juror", async function () {
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror2.address)
                .addBool(true)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror2)
                    .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof)
            ).to.be.revertedWith("Not a juror");
        });

        it("should revert if already voted", async function () {
            const encryptedVote1 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();

            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote1.handles[0], encryptedVote1.inputProof);

            const encryptedVote2 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(false)
                .encrypt();

            await expect(
                sliceFHEContract
                    .connect(signers.juror1)
                    .commitVote(disputeId, encryptedVote2.handles[0], encryptedVote2.inputProof)
            ).to.be.revertedWith("Already voted");
        });

        it("should increment commitmentCount", async function () {
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();

            const disputeBefore = await sliceFHEContract.disputes(disputeId);
            expect(disputeBefore.commitmentCount).to.equal(0);

            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof);

            const disputeAfter = await sliceFHEContract.disputes(disputeId);
            expect(disputeAfter.commitmentCount).to.equal(1);
        });
    });

    // =========================================
    // =       Start Reveal Phase Tests       =
    // =========================================
    describe("startRevealPhase()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.startVotingPhase(disputeId);
            
            // Submit a vote
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof);
        });

        it("should transition to Revealing status after commit deadline", async function () {
            await advanceTime(ONE_WEEK + 1);
            
            await expect(sliceFHEContract.startRevealPhase(disputeId))
                .to.emit(sliceFHEContract, "StatusChanged")
                .withArgs(disputeId, 2); // DisputeStatus.Revealing
        });

        it("should revert if not in Voting status", async function () {
            await advanceTime(ONE_WEEK + 1);
            await sliceFHEContract.startRevealPhase(disputeId);
            
            await expect(
                sliceFHEContract.startRevealPhase(disputeId)
            ).to.be.revertedWith("Dispute not in voting");
        });

        it("should revert if commit deadline not passed", async function () {
            await expect(
                sliceFHEContract.startRevealPhase(disputeId)
            ).to.be.revertedWith("Commit deadline not passed");
        });

        it("should revert if no commitments", async function () {
            // Create a new dispute with no votes
            const disputeId2 = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId2, 0);
            await sliceFHEContract.startVotingPhase(disputeId2);
            await advanceTime(ONE_WEEK + 1);
            
            await expect(
                sliceFHEContract.startRevealPhase(disputeId2)
            ).to.be.revertedWith("No commitments to decrypt");
        });
    });

    // =========================================
    // =       Get Commitment Handles Tests   =
    // =========================================
    describe("getCommitmentHandles()", function () {
        let disputeId: bigint;

        beforeEach(async function () {
            disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                2
            );
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId, 0);
            await sliceFHEContract.startVotingPhase(disputeId);
        });

        it("should return empty array if no commitments", async function () {
            const handles = await sliceFHEContract.getCommitmentHandles(disputeId);
            expect(handles.length).to.equal(0);
        });

        it("should return handles for committed votes", async function () {
            const encryptedVote1 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote1.handles[0], encryptedVote1.inputProof);

            const encryptedVote2 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror2.address)
                .addBool(false)
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror2)
                .commitVote(disputeId, encryptedVote2.handles[0], encryptedVote2.inputProof);

            const handles = await sliceFHEContract.getCommitmentHandles(disputeId);
            expect(handles.length).to.equal(2);
        });
    });

    // =========================================
    // =       Legacy revealVote Tests        =
    // =========================================
    describe("revealVote() - Legacy", function () {
        it("should revert with migration message", async function () {
            await expect(
                sliceFHEContract.revealVote(1, 1, 123)
            ).to.be.revertedWith("Use startRevealPhase() then executeRuling() with decrypted votes");
        });
    });

    // =========================================
    // =       Admin Functions Tests          =
    // =========================================
    describe("Admin Functions", function () {
        describe("setStakePerJuror()", function () {
            it("should allow owner to set stake per juror", async function () {
                const newStake = ethers.parseUnits("20", 6);
                await sliceFHEContract.connect(signers.deployer).setStakePerJuror(newStake);
                expect(await sliceFHEContract.stakePerJuror()).to.equal(newStake);
            });

            it("should revert if not owner", async function () {
                const newStake = ethers.parseUnits("20", 6);
                await expect(
                    sliceFHEContract.connect(signers.alice).setStakePerJuror(newStake)
                ).to.be.revertedWithCustomError(sliceFHEContract, "OwnableUnauthorizedAccount");
            });
        });
    });

    // =========================================
    // =       Integration Tests              =
    // =========================================
    describe("Integration: Full Dispute Lifecycle", function () {
        it("should complete full lifecycle: create -> evidence -> join -> vote", async function () {
            // 1. Create dispute
            const disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                1
            );
            expect(disputeId).to.equal(1n);

            // 2. Submit evidence
            await sliceFHEContract.connect(signers.alice).submitEvidence(disputeId, "QmClaimerEvidence");
            await sliceFHEContract.connect(signers.bob).submitEvidence(disputeId, "QmDefenderEvidence");

            // 3. Juror joins
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);

            // 4. Start voting phase
            await sliceFHEContract.startVotingPhase(disputeId);
            const disputeAfterVoting = await sliceFHEContract.disputes(disputeId);
            expect(disputeAfterVoting.status).to.equal(1); // Voting

            // 5. Commit encrypted vote
            const encryptedVote = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true) // Vote for claimer
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote.handles[0], encryptedVote.inputProof);

            // 6. Advance time and start reveal phase
            await advanceTime(ONE_WEEK + 1);
            await sliceFHEContract.startRevealPhase(disputeId);
            
            const disputeAfterReveal = await sliceFHEContract.disputes(disputeId);
            expect(disputeAfterReveal.status).to.equal(2); // Revealing

            // Note: executeRuling requires actual KMS decryption which is mocked
            // In a real test environment with full FHE support, we would continue here
        });

        it("should handle multiple jurors voting scenario", async function () {
            // Create dispute requiring 2 jurors
            const disputeId = await createDisputeHelper(
                sliceFHEContract,
                signers.alice,
                signers.alice.address,
                signers.bob.address,
                2
            );

            // Setup and join both jurors
            await setupStakedJuror(sliceFHEContract, signers.juror1, STAKE_PER_JUROR * 2n);
            await setupStakedJuror(sliceFHEContract, signers.juror2, STAKE_PER_JUROR * 2n);
            await sliceFHEContract.connect(signers.juror1).joinDispute(disputeId, 0);
            await sliceFHEContract.connect(signers.juror2).joinDispute(disputeId, 0);

            // Start voting
            await sliceFHEContract.startVotingPhase(disputeId);

            // Both jurors vote
            const encryptedVote1 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror1.address)
                .addBool(true)
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror1)
                .commitVote(disputeId, encryptedVote1.handles[0], encryptedVote1.inputProof);

            const encryptedVote2 = await fhevm
                .createEncryptedInput(sliceFHEContractAddress, signers.juror2.address)
                .addBool(false)
                .encrypt();
            await sliceFHEContract
                .connect(signers.juror2)
                .commitVote(disputeId, encryptedVote2.handles[0], encryptedVote2.inputProof);

            // Verify both votes were recorded
            const dispute = await sliceFHEContract.disputes(disputeId);
            expect(dispute.commitmentCount).to.equal(2);

            // Get commitment handles
            const handles = await sliceFHEContract.getCommitmentHandles(disputeId);
            expect(handles.length).to.equal(2);
        });
    });
});