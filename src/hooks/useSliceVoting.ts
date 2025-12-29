import { useState } from "react";
import { toast } from "sonner";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { getContractsForChain, SLICE_ABI } from "@/config/contracts";
import {
  calculateCommitment,
  deriveSaltFromSignature,
  getSaltGenerationMessage,
  recoverVote,
} from "../util/votingUtils";
import { useSignMessage } from "wagmi";
import { saveVoteData, getVoteData } from "../util/votingStorage";

export const useSliceVoting = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string>("");

  const { writeContractAsync } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const chainId = useChainId();
  const { sliceContract } = getContractsForChain(chainId);

  // --- COMMIT VOTE ---
  const commitVote = async (disputeId: string, vote: number) => {
    if (!address || !publicClient) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsProcessing(true);
    setLogs("Generating secure commitment...");

    try {
      // Generate deterministic salt
      const message = getSaltGenerationMessage(disputeId);
      console.log("[Commit] Salt Message:", message);
      const signature = await signMessageAsync({ message });
      console.log("[Commit] Signature:", signature);

      setLogs("Verifying signature...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const salt = deriveSaltFromSignature(signature);
      console.log("[Commit] Salt:", salt);

      // Generate commitment
      const commitmentHash = calculateCommitment(vote, salt);
      console.log(`Vote: ${vote}, Salt: ${salt}, Hash: ${commitmentHash}`);
      setLogs("Sending commitment to blockchain...");

      console.log("[Commit] Vote to be Committed");
      const hash = await writeContractAsync({
        address: sliceContract as `0x${string}`,
        abi: SLICE_ABI,
        functionName: "commitVote",
        args: [BigInt(disputeId), commitmentHash as `0x${string}`],
      });
      console.log("[Commit] Vote Committed");

      setLogs("Waiting for confirmation...");
      await publicClient.waitForTransactionReceipt({ hash });

      // Save to storage
      saveVoteData(sliceContract, disputeId, address, vote, salt);
      toast.success("Vote committed successfully! Salt saved.");
      setLogs("Commitment confirmed on-chain.");

      return true;
    } catch (error: any) {
      console.error("Commit Error:", error);
      // Handle the specific "User rejected" vs "System error"
      const msg = error.message || "Unknown error";
      if (msg.includes("User rejected")) {
        toast.error("Signature rejected");
      } else {
        toast.error("Failed to commit vote");
      }
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // --- REVEAL VOTE ---
  const revealVote = async (disputeId: string) => {
    if (!address || !publicClient) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsProcessing(true);
    setLogs("Retrieving secret salt...");

    try {
      let voteToReveal: number;
      let saltToReveal: bigint;

      const storedData = getVoteData(sliceContract, disputeId, address);

      if (storedData) {
        console.log("Found local data");
        voteToReveal = storedData.vote;
        saltToReveal = BigInt(storedData.salt);
      } else {
        setLogs("Local data missing. Recovering from signature...");

        // Ask user to sign the original message again
        const message = getSaltGenerationMessage(disputeId);
        const signature = await signMessageAsync({ message });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        saltToReveal = deriveSaltFromSignature(signature);

        // Fetch the commitment stored on-chain to verify against
        const onChainCommitment = await publicClient.readContract({
          address: sliceContract as `0x${string}`,
          abi: SLICE_ABI,
          functionName: "commitments",
          args: [BigInt(disputeId), address],
        });

        // Recover the vote by checking which option (0 or 1) matches the hash
        voteToReveal = recoverVote(saltToReveal, onChainCommitment as string);
        setLogs("Vote recovered! Revealing...");
      }

      const hash = await writeContractAsync({
        address: sliceContract as `0x${string}`,
        abi: SLICE_ABI,
        functionName: "revealVote",
        args: [BigInt(disputeId), BigInt(voteToReveal), BigInt(saltToReveal)],
        account: address,
      });

      setLogs("Waiting for confirmation...");
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Vote revealed successfully!");
      setLogs("Vote revealed and counted.");
      return true;
    } catch (error: any) {
      console.error("Reveal Error:", error);
      toast.error(`Reveal Failed: ${error.message}`);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { commitVote, revealVote, isProcessing, logs };
};
