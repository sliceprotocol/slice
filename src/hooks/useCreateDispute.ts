import { useState } from "react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/useContracts";
import { uploadJSONToIPFS } from "@/util/ipfs";
import { toast } from "sonner";

export function useCreateDispute() {
  const { address } = useAccount();
  const { sliceContract } = useContracts();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isCreating, setIsCreating] = useState(false);

  const createDispute = async (
    defenderAddress: string,
    claimerAddress: string | undefined, // NEW: Claimer input
    category: string,
    disputeData: {
      title: string;
      description: string;
      evidence?: string[];
    },
    jurorsRequired: number = 3,
    deadlineHours: number = 96,
  ): Promise<boolean> => {
    try {
      setIsCreating(true);

      // Default to connected user if no claimer specified
      const finalClaimer = claimerAddress || address;

      if (!finalClaimer) {
        toast.error("Claimer address required");
        return false;
      }

      // 1. Upload Metadata (Off-chain)
      toast.info("Uploading evidence to IPFS...");
      const ipfsHash = await uploadJSONToIPFS({
        ...disputeData,
        category,
      });

      if (!ipfsHash) throw new Error("Failed to upload to IPFS");

      console.log("IPFS Hash created:", ipfsHash);
      toast.info("Creating dispute on-chain...");

      // 2. Calculate Phase Durations based on Deadline
      // Total duration in seconds (from hours input)
      const totalSeconds = deadlineHours * 60 * 60;

      // Strategy: Split total time into phases
      // Payment: 10% (Minimum 1 hour to allow reaction)
      // Evidence: 40% (Longest period for gathering info)
      // Commit: 25%
      // Reveal: 25%
      const payTime = Math.max(3600, Math.floor(totalSeconds * 0.1));
      const remainingTime = totalSeconds - payTime;

      const evidenceTime = Math.floor(remainingTime * 0.45); // ~40% of total
      const commitTime = Math.floor(remainingTime * 0.275); // ~25% of total
      const revealTime = Math.floor(remainingTime * 0.275); // ~25% of total

      const paySeconds = BigInt(payTime);
      const evidenceSeconds = BigInt(evidenceTime);
      const commitSeconds = BigInt(commitTime);
      const revealSeconds = BigInt(revealTime);

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "createDispute",
        args: [
          {
            claimer: finalClaimer as `0x${string}`,
            defender: defenderAddress as `0x${string}`,
            category: category,
            ipfsHash: ipfsHash,
            jurorsRequired: BigInt(jurorsRequired),
            paySeconds: paySeconds,
            evidenceSeconds: evidenceSeconds,
            commitSeconds: commitSeconds,
            revealSeconds: revealSeconds,
          },
        ],
      });

      console.log("Creation TX sent:", hash);
      toast.info("Transaction sent. Waiting for confirmation...");

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Dispute created successfully!");
      return true;
    } catch (error: any) {
      console.error("Create dispute failed", error);
      const msg =
        error.reason || error.shortMessage || error.message || "Unknown error";
      toast.error(`Create Failed: ${msg}`);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createDispute, isCreating };
}
