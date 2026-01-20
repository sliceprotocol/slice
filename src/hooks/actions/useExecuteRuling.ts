import { useState } from "react";
import { useWriteContract, usePublicClient } from "wagmi";
import { SLICE_ABI } from "@/config/contracts";
import { useContracts } from "@/hooks/core/useContracts";
import { toast } from "sonner";

export function useExecuteRuling() {
  const { sliceContract } = useContracts();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isExecuting, setIsExecuting] = useState(false);

  const executeRuling = async (disputeId: string | number) => {
    try {
      setIsExecuting(true);
      console.log(`Executing ruling for dispute #${disputeId}...`);

      const hash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "executeRuling",
        args: [BigInt(disputeId)],
      });

      toast.info("Transaction sent. Waiting for confirmation...");

      // Wait for confirmation so the UI can reload the status immediately after
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Ruling executed successfully!");
      return hash;
    } catch (err: any) {
      console.error("Execution Error:", err);
      const msg =
        err.reason || err.shortMessage || err.message || "Unknown error";
      toast.error(`Execution Failed: ${msg}`);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    executeRuling,
    isExecuting, // Matches the original return name (was isExecuting in view_file)
  };
}
