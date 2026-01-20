import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import { useStakingToken } from "@/hooks/core/useStakingToken";

const MINT_ABI = [
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;

export const useFaucet = () => {
    const { address } = useAccount();
    const {
        address: tokenAddress,
        decimals,
        isLoading: isTokenLoading,
    } = useStakingToken();
    const { writeContractAsync, isPending } = useWriteContract();

    const mint = async () => {
        if (!address || !tokenAddress) return;

        try {
            await writeContractAsync({
                address: tokenAddress,
                abi: MINT_ABI,
                functionName: "mint",
                args: [address, parseUnits("50", decimals)],
            });
            toast.success("Minting 50 USDC...");
        } catch (error) {
            console.error("Mint failed", error);
            toast.error("Failed to mint tokens");
        }
    };

    return {
        mint,
        isPending,
        isReady: !isTokenLoading && !!tokenAddress,
    };
};
