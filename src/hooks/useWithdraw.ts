"use client";

import { useState } from "react";
import { useWriteContract, usePublicClient, useReadContract, useAccount } from "wagmi";
import { SLICE_ABI, SLICE_ADDRESS } from "@/config/contracts";
import { toast } from "sonner";
import { formatUnits } from "viem";

export function useWithdraw() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    // Read claimable balance
    const { data: balance, refetch } = useReadContract({
        address: SLICE_ADDRESS,
        abi: SLICE_ABI,
        functionName: "balances",
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    // Get the USDC token address from the contract
    const { data: stakingToken } = useReadContract({
        address: SLICE_ADDRESS,
        abi: SLICE_ABI,
        functionName: "stakingToken",
    });

    const claimableAmount = balance ? formatUnits(balance as bigint, 6) : "0";
    const hasFunds = balance ? (balance as bigint) > 0n : false;

    const withdraw = async () => {
        if (!stakingToken) {
            toast.error("Token address not found");
            return;
        }

        try {
            setIsWithdrawing(true);
            toast.info("Initiating withdrawal...");

            const hash = await writeContractAsync({
                address: SLICE_ADDRESS,
                abi: SLICE_ABI,
                functionName: "withdraw",
                args: [stakingToken as `0x${string}`],
            });

            toast.info("Transaction sent...");

            if (publicClient) {
                await publicClient.waitForTransactionReceipt({ hash });
            }

            toast.success("Funds withdrawn successfully!");
            refetch(); // Update balance UI
            return true;
        } catch (err: any) {
            console.error("Withdraw error", err);
            toast.error(`Withdraw failed: ${err.shortMessage || err.message}`);
            return false;
        } finally {
            setIsWithdrawing(false);
        }
    };

    return {
        withdraw,
        isWithdrawing,
        claimableAmount,
        hasFunds,
        refetchBalance: refetch
    };
}
