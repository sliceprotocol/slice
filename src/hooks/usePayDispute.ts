import { useState } from "react";
import {
  useWriteContract,
  usePublicClient,
  useAccount,
  useChainId,
} from "wagmi";
import { parseUnits, erc20Abi } from "viem";
import { SLICE_ABI, getContractsForChain } from "@/config/contracts";
import { toast } from "sonner";

export function usePayDispute() {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const chainId = useChainId();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "approving" | "paying">("idle");

  const payDispute = async (disputeId: string | number, amountStr: string) => {
    if (!address || !publicClient) {
      toast.error("Wallet not connected");
      return false;
    }

    try {
      setLoading(true);

      const { usdcToken, sliceContract } = getContractsForChain(chainId);

      // Convert amount to BigInt (assuming 6 decimals for USDC)
      const amountBI = parseUnits(amountStr, 6);

      // --- STEP 1: APPROVE ---
      setStep("approving");
      toast.info("Approving tokens...");

      // We check allowance first to avoid redundant approval
      const allowance = await publicClient.readContract({
        address: usdcToken as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, sliceContract as `0x${string}`],
      });

      if (allowance < amountBI) {
        const approveHash = await writeContractAsync({
          address: usdcToken as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [sliceContract as `0x${string}`, amountBI],
        });

        // Wait for approval to be mined
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        toast.success("Approval confirmed.");
      } else {
        console.log("Allowance sufficient, skipping approval.");
      }

      // --- STEP 2: PAY DISPUTE ---
      setStep("paying");
      toast.info("Paying dispute...");

      const payHash = await writeContractAsync({
        address: sliceContract as `0x${string}`,
        abi: SLICE_ABI,
        functionName: "payDispute",
        args: [BigInt(disputeId)],
      });

      // Wait for payment to be mined
      await publicClient.waitForTransactionReceipt({ hash: payHash });

      toast.success("Payment successful!");
      return true;
    } catch (error: any) {
      console.error("Payment flow failed", error);
      const msg =
        error.reason || error.shortMessage || error.message || "Unknown error";
      toast.error(`Payment failed: ${msg}`);
      return false;
    } finally {
      setLoading(false);
      setStep("idle");
    }
  };

  return {
    payDispute,
    isPaying: loading,
    step,
  };
}
