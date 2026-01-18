// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISlice {
    // --- Enums & Structs ---
    enum DisputeStatus {
        Created,
        Commit,
        Reveal,
        Finished
    }

    struct DisputeConfig {
        address claimer;
        address defender;
        string category;
        string ipfsHash;
        uint256 jurorsRequired;
        uint256 paySeconds;
        uint256 evidenceSeconds;
        uint256 commitSeconds;
        uint256 revealSeconds;
    }

    struct Dispute {
        uint256 id;
        address claimer;
        address defender;
        string category;
        uint256 requiredStake;
        uint256 jurorsRequired;
        string ipfsHash;
        // state
        uint256 commitsCount;
        uint256 revealsCount;
        DisputeStatus status;
        bool claimerPaid;
        bool defenderPaid;
        address winner;
        // deadlines
        uint256 payDeadline;
        uint256 evidenceDeadline;
        uint256 commitDeadline;
        uint256 revealDeadline;
    }

    struct JurorStats {
        uint256 totalDisputes;
        uint256 coherentVotes;
        uint256 totalEarnings;
    }

    // --- Events ---
    event DisputeCreated(uint256 indexed id, address claimer, address defender);
    event FundsDeposited(uint256 indexed id, address role, uint256 amount);
    event EvidenceSubmitted(uint256 indexed id, address indexed party, string ipfsHash);
    event JurorJoined(uint256 indexed id, address juror);
    event StatusChanged(uint256 indexed id, DisputeStatus newStatus);
    event VoteCommitted(uint256 indexed id, address juror);
    event VoteRevealed(uint256 indexed id, address juror, uint256 vote);
    event RulingExecuted(uint256 indexed id, address winner);
    event FundsWithdrawn(address indexed user, uint256 amount);

    // --- State Variable Getters ---
    function disputeCount() external view returns (uint256);
    function stakingToken() external view returns (IERC20);
    function MIN_STAKE() external view returns (uint256);
    function MAX_STAKE() external view returns (uint256);

    // --- Mapping Getters ---
    function disputeJurors(uint256 _id, uint256 _index) external view returns (address);
    function commitments(uint256 _id, address _juror) external view returns (bytes32);
    function revealedVotes(uint256 _id, address _juror) external view returns (uint256);
    function hasRevealed(uint256 _id, address _juror) external view returns (bool);
    function balances(address _user) external view returns (uint256);
    function jurorStakes(uint256 _id, address _juror) external view returns (uint256);
    function jurorStats(address _juror) external view returns (uint256 totalDisputes, uint256 coherentVotes, uint256 totalEarnings);

    // --- View Functions ---
    function disputes(uint256 _id) external view returns (Dispute memory);
    function getJurorDisputes(address _user) external view returns (uint256[] memory);
    function getUserDisputes(address _user) external view returns (uint256[] memory);

    // --- Core Functions ---
    function createDispute(DisputeConfig calldata _config) external returns (uint256);
    function submitEvidence(uint256 _id, string calldata _ipfsHash) external;
    function payDispute(uint256 _id) external;
    function joinDispute(uint256 _id, uint256 _amount) external;
    function commitVote(uint256 _id, bytes32 _commitment) external;
    function revealVote(uint256 _id, uint256 _vote, uint256 _salt) external;
    function executeRuling(uint256 _id) external;
    function withdraw() external;
}
