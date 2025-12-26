// src/hooks/useReveal.ts
import { useState, useEffect } from "react";
import { useConnect } from "@/providers/ConnectProvider";
import { useSliceContract } from "@/hooks/useSliceContract";
import { useSliceVoting } from "@/hooks/useSliceVoting";
import { useGetDispute } from "@/hooks/useGetDispute";
import { getVoteData } from "@/util/votingStorage";

export function useReveal(disputeId: string) {
  const { address } = useConnect();
  const contract = useSliceContract();
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
    if (address && contract?.target) {
      const storedData = getVoteData(contract.target as string, disputeId, address);
      if (storedData) {
        setLocalVote(storedData.vote);
        setHasLocalData(true);
      } else {
        setHasLocalData(false);
      }
    }
  }, [address, disputeId, contract]);

  return {
    dispute,
    localVote,
    hasLocalData,
    status,
    revealVote: () => revealVote(disputeId),
    isProcessing,
    logs
  };
}