import { useReadContract, useAccount } from "wagmi";
import { SLICE_ABI, SLICE_ADDRESS } from "@/config/contracts";
import { formatUnits } from "viem";

export function useJurorStats() {
  const { address } = useAccount();

  const { data, isLoading, refetch } = useReadContract({
    address: SLICE_ADDRESS,
    abi: SLICE_ABI,
    functionName: "jurorStats", // New mapping on contract
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Default State
  if (!data || !address) {
    return {
      stats: {
        matches: 0,
        wins: 0,
        earnings: "0",
        accuracy: "0%",
      },
      rank: "Rookie",
      isLoading,
      refetch,
    };
  }

  // Parse Data: struct { totalDisputes; coherentVotes; totalEarnings; }
  // Wagmi returns this as an array or object depending on config, usually array for unnamed structs
  const matches = Number((data as unknown as any[])[0]);
  const wins = Number((data as unknown as any[])[1]);
  const rawEarnings = (data as unknown as any[])[2];

  // Calculate Accuracy
  const accuracyVal = matches > 0 ? (wins / matches) * 100 : 0;
  const accuracy = accuracyVal.toFixed(0) + "%";

  // Determine Rank
  let rank = "Rookie";
  if (matches > 5) {
    if (accuracyVal >= 90) rank = "High Arbiter";
    else if (accuracyVal >= 70) rank = "Magistrate";
    else if (accuracyVal >= 50) rank = "Juror";
  }

  return {
    stats: {
      matches,
      wins,
      earnings: formatUnits(rawEarnings, 6), // USDC 6 decimals
      accuracy,
    },
    rank,
    isLoading,
    refetch,
  };
}
