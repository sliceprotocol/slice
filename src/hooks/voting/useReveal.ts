import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useContracts } from "@/hooks/core/useContracts";
import { useSliceVoting } from "@/hooks/voting/useSliceVoting";
import { useGetDispute } from "@/hooks/disputes/useGetDispute";
import { getVoteData } from "@/util/votingStorage";

export function useReveal(disputeId: string) {
  const { address } = useAccount();
  const { sliceContract } = useContracts();

  const { revealVote, isProcessing, logs } = useSliceVoting();
  const { dispute } = useGetDispute(disputeId);

  const [localVote, setLocalVote] = useState<number | null>(null);
  const [hasLocalData, setHasLocalData] = useState(false);

  // Status flags
  const status = {
    isTooEarly: dispute ? dispute.status < 2 : true,
    isRevealOpen: dispute ? dispute.status === 2 : false,
    isFinished: dispute ? dispute.status > 2 : false,
  };

  useEffect(() => {
    if (address && sliceContract) {
      const stored = getVoteData(sliceContract, disputeId, address);
      if (stored) {
        setLocalVote(stored.vote);
        setHasLocalData(true);
      } else {
        setHasLocalData(false);
      }
    }
  }, [address, disputeId, sliceContract]);

  return {
    dispute,
    localVote,
    hasLocalData,
    status,
    revealVote: () => revealVote(disputeId),
    isProcessing,
    logs,
  };
}
