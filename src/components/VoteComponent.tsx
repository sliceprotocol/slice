import React, { useState } from "react";
import { Box } from "./layout/Box";
import { useWallet } from "../providers/WalletProvider";
import { useSliceVoting } from "../hooks/useSliceVoting";

export const VoteComponent: React.FC = () => {
  const { address } = useWallet();
  const { commitVote, revealVote, isProcessing, logs } = useSliceVoting();

  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [disputeId, setDisputeId] = useState<string>("1");

  const handleVoteSelect = (vote: number) => {
    setSelectedVote(vote);
  };

  const handleCommit = async () => {
    if (selectedVote === null) return;
    await commitVote(disputeId, selectedVote);
  };

  const handleReveal = async () => {
    await revealVote(disputeId);
  };

  return (
    <div className="card">
      <Box gap="md" direction="column">
        <h2 className="text-lg">
          Juror Private Vote (Commit + Reveal with ZK)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Dispute ID</label>
          <input
            className="input-field"
            id="dispute-id"
            value={disputeId}
            onChange={(e) => setDisputeId(e.target.value)}
            placeholder="Enter ID"
          />
        </div>

        <Box gap="md" direction="row" justify="center">
          <button
            className={`btn ${selectedVote === 0 ? "btn-primary" : "btn-secondary"}`}
            onClick={() => handleVoteSelect(0)}
            disabled={isProcessing}
          >
            Vote Party A (0)
          </button>

          <button
            className={`btn ${selectedVote === 1 ? "btn-primary" : "btn-secondary"}`}
            onClick={() => handleVoteSelect(1)}
            disabled={isProcessing}
          >
            Vote Party B (1)
          </button>
        </Box>

        <Box gap="sm" direction="row">
          <button
            className="btn btn-primary"
            onClick={() => void handleCommit()}
            disabled={isProcessing || selectedVote === null || !address}
          >
            {isProcessing ? "Processing..." : "Commit Vote"}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => void handleReveal()}
            disabled={isProcessing || !address}
          >
            {isProcessing ? "Processing..." : "Reveal Vote"}
          </button>
        </Box>

        {logs && (
          <div
            style={{
              marginTop: 10,
              padding: 15,
              background: "#2c3e50",
              color: "#fff",
              borderRadius: 4,
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            {logs}
          </div>
        )}
      </Box>
    </div>
  );
};
