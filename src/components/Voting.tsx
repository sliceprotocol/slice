import React, { useState } from 'react';
import { Box } from './layout/Box';
import { useWallet } from '../hooks/useWallet';
import { useVoting } from '../contexts/VotingContext';
import { ProposalCard } from './ProposalCard';

export const Voting: React.FC = () => {
  const { address } = useWallet();
  const { proposals, isLoading, error, createProposal, refreshProposals } = useVoting();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateProposal = async () => {
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a description' });
      return;
    }

    if (!deadline.trim()) {
      setMessage({ type: 'error', text: 'Please enter a deadline (ledger sequence number)' });
      return;
    }

    const deadlineNum = parseInt(deadline);
    if (isNaN(deadlineNum) || deadlineNum <= 0) {
      setMessage({ type: 'error', text: 'Invalid deadline. Must be a positive ledger sequence number.' });
      return;
    }

    setIsCreating(true);
    setMessage(null);

    try {
      const proposalId = await createProposal(description, deadlineNum);
      if (proposalId) {
        setMessage({
          type: 'success',
          text: `Proposal #${proposalId} created successfully!`,
        });
        setDescription('');
        setDeadline('');
        setShowCreateForm(false);
        setTimeout(() => {
          void refreshProposals();
        }, 1000);
      } else {
        setMessage({ type: 'error', text: 'Failed to create proposal' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to create proposal' });
    } finally {
      setIsCreating(false);
    }
  };

  if (!address) {
    return (
      <Box gap="md" direction="column">
        <h2 className="text-xl font-bold">
          Anonymous Voting System
        </h2>
        <p className="text-base" style={{ color: '#6b7280' }}>
          Connect your wallet to participate in anonymous voting using zero-knowledge proofs.
        </p>
      </Box>
    );
  }

  return (
    <Box gap="lg" direction="column">
      <Box gap="md" direction="column">
        <h2 className="text-2xl font-bold" style={{ margin: 0 }}>
          Anonymous Voting System
        </h2>
        <p className="text-base" style={{ color: '#6b7280', margin: 0 }}>
          Participate in anonymous voting using zero-knowledge proofs. Your vote is hidden until you reveal it.
        </p>
      </Box>

      {error && (
        <Box
          gap="sm"
          style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
          }}
        >
          <p className="text-sm" style={{ color: '#dc2626', margin: 0 }}>
            {error}
          </p>
        </Box>
      )}

      {/* Create Proposal */}
      {address && (
        <Box gap="md" direction="column">
          {!showCreateForm ? (
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              Create New Proposal
            </button>
          ) : (
            <Box
              gap="md"
              direction="column"
              style={{
                padding: '1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
              }}
            >
              <h3 className="text-lg font-bold" style={{ margin: 0 }}>
                Create Proposal
              </h3>
              <Box gap="sm" direction="column">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    id="description"
                    className="input-field"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setMessage(null);
                    }}
                    placeholder="Enter proposal description"
                  />
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline (Ledger Sequence)</label>
                  <input
                    id="deadline"
                    className="input-field"
                    value={deadline}
                    onChange={(e) => {
                      setDeadline(e.target.value);
                      setMessage(null);
                    }}
                    placeholder="e.g., 100000"
                    type="number"
                  />
                </div>
                {message && (
                  <p
                    className="text-sm"
                    style={{
                      color: message.type === 'success' ? '#059669' : '#dc2626',
                      margin: 0,
                    }}
                  >
                    {message.text}
                  </p>
                )}
                <Box gap="sm" direction="row">
                  <button
                    className="btn btn-primary"
                    onClick={() => { void handleCreateProposal(); }}
                    disabled={isCreating || !description.trim() || !deadline.trim()}
                  >
                    {isCreating ? 'Creating...' : 'Create Proposal'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowCreateForm(false);
                      setDescription('');
                      setDeadline('');
                      setMessage(null);
                    }}
                  >
                    Cancel
                  </button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Proposals List */}
      <Box gap="md" direction="column">
        <Box gap="sm" direction="row" align="center" wrap="wrap">
          <h3 className="text-lg font-bold" style={{ margin: 0 }}>
            Proposals
          </h3>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { void refreshProposals(); }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </Box>

        {isLoading && proposals.length === 0 && (
          <p className="text-base" style={{ color: '#6b7280' }}>
            Loading proposals...
          </p>
        )}

        {!isLoading && proposals.length === 0 && (
          <p className="text-base" style={{ color: '#6b7280' }}>
            No proposals yet. Create one to get started!
          </p>
        )}

        {proposals.length > 0 && (
          <Box gap="md" direction="column">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onUpdate={() => { void refreshProposals(); }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
