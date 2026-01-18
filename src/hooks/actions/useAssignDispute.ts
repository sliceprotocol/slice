import { useCallback, useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { SLICE_ABI, getContractsForChain } from "@/config/contracts";
import { toast } from "sonner";
import { useStakingToken } from "../core/useStakingToken";

export function useAssignDispute() {
  const [isFinding, setIsFinding] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const { address: stakingToken, decimals, symbol } = useStakingToken();
  const { address } = useAccount();
  const chainId = useChainId();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { sliceContract } = getContractsForChain(chainId);

  // 1. MATCHMAKER Logic (Optimized with Multicall)
  const findActiveDispute = useCallback(async (): Promise<number | null> => {
    if (!publicClient || !sliceContract) return null;
    setIsFinding(true);

    try {
      // Step 1: Get Total Count
      const count = await publicClient.readContract({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "disputeCount",
      });

      const totalDisputes = Number(count);
      if (totalDisputes === 0) {
        toast.error("No disputes created yet.");
        return null;
      }

      // Step 2: Smart Selection
      // Instead of checking ALL IDs (1 to 1000), check only the latest 20.
      // Older disputes are highly likely to be closed.
      const BATCH_SIZE = 20;
      const startId = Math.max(1, totalDisputes - BATCH_SIZE + 1);

      // Create array of IDs to check: [100, 99, 98, ..., 81]
      const searchIds = Array.from(
        { length: totalDisputes - startId + 1 },
        (_, i) => totalDisputes - i,
      );

      // Step 3: Multicall (The Fix)
      // This packs 20 read operations into ONE HTTP request
      const results = await publicClient.multicall({
        contracts: searchIds.map((id) => ({
          address: sliceContract,
          abi: SLICE_ABI,
          functionName: "disputes",
          args: [BigInt(id)],
        })),
      });

      // Step 4: Filter Results in Memory
      const availableIds: number[] = [];

      results.forEach((result, index) => {
        if (result.status === "success" && result.result) {
          const disputeData = result.result as any;

          // Access status safely (struct index 9 or property 'status')
          // Status 1 = Commit Phase (Open for jurors)
          const status = Number(disputeData.status ?? disputeData[9]);

          if (status === 1) {
            availableIds.push(searchIds[index]);
          }
        }
      });

      if (availableIds.length === 0) {
        // If nothing found in latest 20, you could theoretically recurse here,
        // but for a matchmaker, saying "no recent active disputes" is usually acceptable.
        return null;
      }

      // Pick random from the active ones found
      const randomIndex = Math.floor(Math.random() * availableIds.length);
      return availableIds[randomIndex];
    } catch (error) {
      console.error("[Matchmaker] Error:", error);
      return null;
    } finally {
      setIsFinding(false);
    }
  }, [publicClient, sliceContract]);

  // 2. ACTION: Join Dispute
  const joinDispute = async (disputeId: number, amount: string = "50") => {
    if (!address || !publicClient) {
      toast.error("Wallet not connected");
      return false;
    }

    try {
      setIsJoining(true);

      // Calculate explicit amount based on token decimals
      const amountToStake = parseUnits(amount, decimals);

      console.log(`[Join] Staking: ${amount} ${symbol} (${amountToStake})`);

      // Check Allowance
      const allowance = await publicClient.readContract({
        address: stakingToken,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, sliceContract],
      });

      if (allowance < amountToStake) {
        toast.info("Approving Stake...");
        const approveHash = await writeContractAsync({
          address: stakingToken,
          abi: erc20Abi,
          functionName: "approve",
          args: [sliceContract, amountToStake],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        toast.success("Approval confirmed.");
      }

      toast.info("Joining Jury...");

      const joinHash = await writeContractAsync({
        address: sliceContract,
        abi: SLICE_ABI,
        functionName: "joinDispute",
        args: [BigInt(disputeId), amountToStake],
      });

      await publicClient.waitForTransactionReceipt({ hash: joinHash });

      toast.success("Successfully joined the dispute!");
      return true;
    } catch (error: any) {
      console.error("Join failed", error);
      // Handle "User rejected" vs actual errors
      const msg = error.shortMessage || error.message || "Unknown error";
      toast.error(`Join failed: ${msg}`);
      return false;
    } finally {
      setIsJoining(false);
    }
  };

  return {
    findActiveDispute,
    joinDispute,
    isLoading: isJoining,
    isFinding,
    isReady: !!address,
  };
}
