import { useCallback, useState, useEffect } from "react";
import { useSliceContract } from "./useSliceContract";
import { transformDisputeData, DisputeUI } from "@/util/disputeAdapter";

export function useGetDispute(disputeId: string | number) {
  const contract = useSliceContract();
  const [dispute, setDispute] = useState<DisputeUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDispute = useCallback(async () => {
    if (!contract || !disputeId) return;
    setIsLoading(true);
    try {
      const d = await contract.disputes(disputeId);
      // We pass null for address/localVote for general view, 
      // or you can inject them if needed for specific phase logic
      const transformed = await transformDisputeData(d);
      setDispute(transformed);
    } catch (err) {
      console.error(err);
      setDispute(null);
    } finally {
      setIsLoading(false);
    }
  }, [disputeId, contract]);

  useEffect(() => { void fetchDispute(); }, [fetchDispute]);

  return { dispute, isLoading, refetch: fetchDispute };
}
