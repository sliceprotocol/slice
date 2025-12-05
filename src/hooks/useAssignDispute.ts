import { useState } from "react";

export function useAssignDispute() {
  const [isLoading, setIsLoading] = useState(false);

  const assignDispute = async (category: string, stakeAmount: bigint) => {
    setIsLoading(true);
    console.log("TODO: Implement EVM assignDispute", { category, stakeAmount });

    // Simulate delay
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);

    return [BigInt(123), "G..."];
  };

  return { assignDispute, isLoading };
}
