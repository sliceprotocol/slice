import { useState } from "react";

export const useSliceVoting = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string>("");

  const commitVote = async (disputeId: string, vote: number) => {
    setIsProcessing(true);
    setLogs("Simulating EVM Commit...");
    await new Promise((r) => setTimeout(r, 1000));
    setIsProcessing(false);
    return true;
  };

  const revealVote = async (disputeId: string) => {
    setIsProcessing(true);
    setLogs("Simulating EVM Reveal...");
    await new Promise((r) => setTimeout(r, 1000));
    setIsProcessing(false);
    return true;
  };

  return { commitVote, revealVote, isProcessing, logs };
};
