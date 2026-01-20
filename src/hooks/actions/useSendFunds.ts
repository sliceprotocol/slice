"use client";

import { useState } from "react";
import { useWriteContract, usePublicClient, useAccount } from "wagmi";
import { parseUnits, erc20Abi, isAddress } from "viem";
import { toast } from "sonner";
import { useStakingToken } from "../core/useStakingToken";

export function useSendFunds(onSuccess?: () => void) {
  const { address } = useAccount();
  const { address: stakingToken, decimals } = useStakingToken();

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);

  const sendFunds = async (recipient: string, amount: string) => {
    // Basic Validation
    if (!address) {
      toast.error("Wallet not connected");
      return;
    }
    if (!isAddress(recipient)) {
      toast.error("Invalid recipient address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    setIsLoading(true);
    try {
      const value = parseUnits(amount, decimals);

      toast.info("Sending transaction...");

      // Execute
      const hash = await writeContractAsync({
        address: stakingToken,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient, value],
      });

      // Wait
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      toast.success("Transfer successful!");
      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.reason || err.shortMessage || err.message || "Transaction failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { sendFunds, isLoading };
}
