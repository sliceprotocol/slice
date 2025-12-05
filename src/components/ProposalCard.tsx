import React, { useState, useEffect } from 'react';
import { Box } from './layout/Box';
import { Proposal, votingService } from '../services/VotingService';
import { VoteForm } from './VoteForm';
import { RevealForm } from './RevealForm';

interface ProposalCardProps {
  proposal: Proposal;
  onUpdate: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onUpdate }) => {
  const [voteCounts, setVoteCounts] = useState<{ [key: number]: number }>({});
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [showRevealForm, setShowRevealForm] = useState(false);
  const [isLoadingCounts, setIsLoadingCounts] = useState(false);
  const [currentLedger, setCurrentLedger] = useState<number>(0);

  const isVotingPhase = currentLedger <= proposal.deadline;
  const isRevealPhase = currentLedger > proposal.deadline;

  useEffect(() => {
    void loadVoteCounts();
    // Update current ledger periodically (in real app, would poll network)
    // For now, using a simple estimate
    setCurrentLedger(Math.floor(Date.now() / 1000)); // Rough estimate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal.id]);

  const loadVoteCounts = async () => {
    setIsLoadingCounts(true);
    try {
      const count0 = await votingService.getVoteCount(proposal.id, 0);
      const count1 = await votingService.getVoteCount(proposal.id, 1);
      setVoteCounts({ 0: count0, 1: count1 });
    } catch (error) {
      console.error('Failed to load vote counts:', error);
    } finally {
      setIsLoadingCounts(false);
    }
  };

  const handleVoteSuccess = () => {
    setShowVoteForm(false);
    onUpdate();
  };

  const handleRevealSuccess = () => {
    setShowRevealForm(false);
    void loadVoteCounts();
    onUpdate();
  };

  return (
    <Box
      gap="md"
      direction="column"
      style={{
        padding: '1.5rem',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
      }}
    >
      <Box gap="sm" direction="column">
        <h3 className="text-xl font-bold" style={{ margin: 0 }}>
          Proposal #{proposal.id}
        </h3>
        <p className="text-base" style={{ margin: 0, color: '#4b5563' }}>
          {proposal.description}
        </p>
      </Box>

      <Box gap="xs" direction="column">
        <p className="text-sm" style={{ margin: 0, color: '#6b7280' }}>
          Creator: {proposal.creator.slice(0, 8)}...
        </p>
        <p className="text-sm" style={{ margin: 0, color: '#6b7280' }}>
          Deadline: Ledger {proposal.deadline}
        </p>
        <p
          className="text-sm font-bold"
          style={{
            margin: 0,
            color: isVotingPhase ? '#059669' : '#dc2626',
          }}
        >
          Status: {isVotingPhase ? 'Voting Phase' : 'Reveal Phase'}
        </p>
      </Box>

      {/* Vote Counts */}
      {isRevealPhase && (
        <Box gap="md" direction="row" align="center">
          <Box gap="xs" direction="column">
            <p className="text-sm" style={{ margin: 0, color: '#6b7280' }}>
              Votes Against (0):
            </p>
            <p className="text-lg font-bold" style={{ margin: 0 }}>
              {isLoadingCounts ? '...' : voteCounts[0] || 0}
            </p>
          </Box>
          <Box gap="xs" direction="column">
            <p className="text-sm" style={{ margin: 0, color: '#6b7280' }}>
              Votes For (1):
            </p>
            <p className="text-lg font-bold" style={{ margin: 0 }}>
              {isLoadingCounts ? '...' : voteCounts[1] || 0}
            </p>
          </Box>
        </Box>
      )}

      {/* Actions */}
      <Box gap="sm" direction="row" wrap="wrap">
        {isVotingPhase && (
          <>
            {!showVoteForm && (
              <button
                className="btn btn-primary"
                onClick={() => setShowVoteForm(true)}
              >
                Vote
              </button>
            )}
            {!showRevealForm && (
              <button
                className="btn btn-secondary"
                onClick={() => setShowRevealForm(true)}
              >
                Reveal Vote
              </button>
            )}
          </>
        )}
        {isRevealPhase && (
          <>
            {!showRevealForm && (
              <button
                className="btn btn-primary"
                onClick={() => setShowRevealForm(true)}
              >
                Reveal Vote
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => { void loadVoteCounts(); }}
              disabled={isLoadingCounts}
            >
              {isLoadingCounts ? 'Loading...' : 'Refresh Counts'}
            </button>
          </>
        )}
      </Box>

      {/* Vote Form */}
      {showVoteForm && (
        <VoteForm
          proposalId={proposal.id}
          onSuccess={handleVoteSuccess}
          onCancel={() => setShowVoteForm(false)}
        />
      )}

      {/* Reveal Form */}
      {showRevealForm && (
        <RevealForm
          proposalId={proposal.id}
          onSuccess={handleRevealSuccess}
          onCancel={() => setShowRevealForm(false)}
        />
      )}
    </Box>
  );
};
