// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SliceV2 is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public stakingToken;
    uint256 public stakePerJuror; // This is the stake required when creating a dispute to ask for a certain number of jurors (ej this is 5usd you need it to be 10 to ask for 2 jurors)
    uint256 public disputeCount;

    enum DisputeStatus {
        Created, // Uplading evidence
        Voting, // Voting
        Revealing, // Revealing
        Finished // Finished
    }
    
    struct Dispute {
        address claimer;
        address defender;
        address[] jurors;
        string ipfsHash;
        DisputeStatus status;
        uint256 stakeRequired;
        uint256 jurorsRequired;
        uint256 payDeadline;
        uint256 evidenceDeadline;
        uint256 commitDeadline;
        uint256 revealDeadline;
    }

    struct DisputeConfig {
        address claimer;
        address defender; 
        uint256 jurorsRequired;
        uint256 paySeconds;
        uint256 evidenceSeconds;
        uint256 commitSeconds;
        uint256 revealSeconds;
    }

    struct UserStats {
        uint256 totalStaked;
        uint256 stakeInDisputes;
        uint256[] activeDisputes;
        uint256[] finishedDisputes; // This can be read from indexer it is not needed on chian
    }

    mapping(uint256 => Dispute) public disputes; // Disputeid => Dispute
    mapping(uint256 => UserStats) public userStats; // Userid => UserStats

    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }


    // ===============================
    // =       Core Functions       =
    // ===============================

    function createDispute(DisputeConfig calldata _config) external nonReentrant returns (uint256) {
        require(_config.claimer != address(0), "Claimer cannot be 0 address");
        require(_config.defender != address(0), "Defender cannot be 0 address");
        require(_config.paySeconds > 0, "Pay seconds must be greater than 0");
        require(_config.evidenceSeconds > 0, "Evidence seconds must be greater than 0");
        require(_config.commitSeconds > 0, "Commit seconds must be greater than 0");
        require(_config.revealSeconds > 0, "Reveal seconds must be greater than 0");
        require(msg.sender != _config.defender, "Self-dispute not allowed");
        require(
            _config.claimer != _config.defender,
            "Claimer cannot be Defender"
        );        
        require(_config.jurorsRequired > 0, "Jurors required must be greater than 0");

        uint256 stakeRequired = stakePerJuror * _config.jurorsRequired;

        // Transfer the stake to the contract
        stakingToken.safeTransferFrom(msg.sender, address(this), stakeRequired);

        disputeCount++;

        // Create the dispute
        disputes[disputeCount] = Dispute({
            claimer: _config.claimer,
            defender: _config.defender,
            ipfsHash: _config.ipfsHash,
            status: DisputeStatus.Created,
            stakeRequired: stakeRequired,
            jurorsRequired: _config.jurorsRequired,
            payDeadline: block.timestamp + _config.paySeconds,
            evidenceDeadline: block.timestamp + _config.evidenceSeconds,
            commitDeadline: block.timestamp + _config.commitSeconds,
            revealDeadline: block.timestamp + _config.revealSeconds
        });

        userStats[_config.claimer].activeDisputes.push(disputeCount);
        userStats[_config.defender].activeDisputes.push(disputeCount);

        emit DisputeCreated(disputeCount, _config.claimer, _config.defender);

        return disputeCount;
    }

    function submitEvidence(uint256 _id, string calldata _ipfsHash) external {
        Dispute storage dispute = disputes[_id];
        require(dispute.status == DisputeStatus.Created, "Dispute not created");
        require(block.timestamp < dispute.evidenceDeadline, "Evidence deadline passed");
        require(msg.sender == dispute.claimer || msg.sender == dispute.defender, "Not allowed to submit evidence");
        
        dispute.ipfsHash = _ipfsHash;

        emit EvidenceSubmitted(_id, msg.sender, _ipfsHash);
    }

    function payDispute(uint256 _id) external nonReentrant {

    }

    function joinDispute(uint256 _id, uint256 _amount) external nonReentrant {
        Dispute storage dispute = disputes[_id];

        require(dispute.status == DisputeStatus.Created, "Dispute not created");
        require(dispute.jurors.length < dispute.jurorsRequired, "Jurors required reached");
        require(msg.sender != dispute.claimer && msg.sender != dispute.defender, "Not allowed to join dispute");

        UserStats storage userStats = userStats[msg.sender];

        uint256 totalToStake = dispute.stakeRequired;
        require(userStats.totalStaked - userStats.stakeInDisputes >= totalToStake, "Not enough staked"); // Check if the user has enough staked to join the dispute
        userStats.stakeInDisputes += totalToStake;
        userStats.activeDisputes.push(_id);

        dispute.jurors.push(msg.sender);
        emit JurorJoined(_id, msg.sender);

    }

    function commitVote(uint256 _id, bool _commitment) external {
        Dispute storage dispute = disputes[_id];
        
        require(dispute.status == DisputeStatus.Voting, "Dispute not voting");
        require(block.timestamp < dispute.commitDeadline, "Commit deadline passed");
        // The dispute jurors must include the voter

        bool found = false;
        for(uint i = 0; i <dispute.jurors.length; i++) {
            if(dispute.jurors[i] == msg.sender) {
                found = true;
                break;
            }
        }

        require(found, "Not a juror");
        
        dispute.commitments[msg.sender] = _commitment;
        
        emit VoteCommitted(_id, msg.sender, _commitment);

        // If it was the last juror to commit, we can go to the revealing phase
        if(dispute.commitments.length == dispute.jurorsRequired) {
            dispute.status = DisputeStatus.Revealing;
            emit StatusChanged(_id, DisputeStatus.Revealing);
        }
    }

    // Revealing votes, this wont be needed in the future with Homomorphic encryption
    function revealVote(uint256 _id, uint256 _vote, uint256 _salt) external {
        Dispute storage dispute = disputes[_id];
        
        require(dispute.status == DisputeStatus.Revealing, "Dispute not revealing");
        require(block.timestamp < dispute.revealDeadline, "Reveal deadline passed");
        require(msg.sender != dispute.claimer && msg.sender != dispute.defender, "Not allowed to reveal vote");
        require(dispute.commitments[msg.sender] != 0, "No commitment found");
        
        dispute.revealedVotes[msg.sender] = _vote;
        emit VoteRevealed(_id, msg.sender, _vote);
        if(dispute.revealedVotes.length == dispute.jurorsRequired) {
            dispute.status = DisputeStatus.Finished;
            emit StatusChanged(_id, DisputeStatus.Finished);
        }
    }

    // Executing the ruling, this will be needed in the future with Homomorphic encryption
    function executeRuling(uint256 _id) external nonReentrant {

    }

    function _distributeRewards(uint256 _id) internal {
        Dispute storage dispute = disputes[_id];
        require(dispute.status == DisputeStatus.Finished, "Dispute not finished");
        bool winningVote = dispute.winningVote;

    }

    function withdraw() external nonReentrant {
        UserStats storage userStats = userStats[msg.sender];
        require(userStats.totalStaked > 0, "No staked");

        // The user can withdraw the amount he has not staked in disputes
        uint256 amountToWithdraw = userStats.totalStaked - userStats.stakeInDisputes;
        stakingToken.safeTransfer(msg.sender, amountToWithdraw);
        userStats.totalStaked = userStats.stakeInDisputes;
        emit Withdrawn(msg.sender, amountToWithdraw);
    }


    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        UserStats storage userStats = userStats[msg.sender];
     
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);

        userStats.totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    // View functions


}