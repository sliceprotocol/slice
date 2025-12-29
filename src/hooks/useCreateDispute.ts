import { useState } from "react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { SLICE_ABI, SLICE_ADDRESS } from "@/config/contracts";
import { uploadJSONToIPFS } from "@/util/ipfs";
import { toast } from "sonner";

export function useCreateDispute() {
  const { address } = useAccount();
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

      // 2. Send Transaction using new Struct format
      const time = BigInt(60 * 60 * 24); // 24 hours per phase

      const hash = await writeContractAsync({
        address: SLICE_ADDRESS,
        abi: SLICE_ABI,
        functionName: "createDispute",
        args: [
          {
            claimer: finalClaimer as `0x${string}`, // NEW FIELD
            defender: defenderAddress as `0x${string}`,
            category: category,
            ipfsHash: ipfsHash,
            jurorsRequired: BigInt(jurorsRequired),
            paySeconds: time,
            evidenceSeconds: time, // NEW FIELD
            commitSeconds: time,
            revealSeconds: time,
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
      const msg = error.reason || error.shortMessage || error.message || "Unknown error";
      toast.error(`Create Failed: ${msg}`);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createDispute, isCreating };
}
