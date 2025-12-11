import { useCallback, useState } from "react";
import { Contract } from "ethers";
import { useSliceContract } from "./useSliceContract";
import { useXOContracts } from "@/providers/XOContractsProvider";
import { toast } from "sonner";
import { USDC_ADDRESS } from "@/config";
import { sliceAddress } from "@/contracts/slice-abi";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
];

export function useAssignDispute() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const contract = useSliceContract();
  const { address, signer } = useXOContracts();

  // 1. MATCHMAKER: Find a random active dispute ID
  // (Logic largely remains the same, just ensures we find a valid ID)
  const findActiveDispute = useCallback(async (): Promise<number | null> => {
    if (!contract) return null;
    setIsFinding(true);

    try {
      const countBigInt = await contract.disputeCount();
      const totalDisputes = Number(countBigInt);

      if (totalDisputes === 0) {
        toast.error("No disputes created yet.");
        return null;
      }

      console.log(`Searching ${totalDisputes} disputes for active cases...`);

      const availableIds: number[] = [];

      // Scan for Active disputes in Commit Phase
      for (let i = 1; i <= totalDisputes; i++) {
        try {
          const d = await contract.disputes(i);
          // Status 1 = Commit Phase
          if (Number(d.status) === 1) {
             // Optional: Check if jury is full logic could be added here
             availableIds.push(i);
          }
        } catch (e) {
          console.warn(`Skipping dispute #${i}`, e);
        }
        // Wait for a short time before checking the next dispute
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (availableIds.length === 0) return null;

      // Random Selection
      const randomIndex = Math.floor(Math.random() * availableIds.length);
      return availableIds[randomIndex];
    } catch (error) {
      console.error("Error finding dispute:", error);
      toast.error("Error searching for disputes");
      return null;
    } finally {
      setIsFinding(false);
    }
  }, [contract]);

  // 2. ACTION: Join a specific dispute (Removed stakeAmountStr argument for reliability)
  const joinDispute = async (disputeId: number) => {
    if (!contract || !address || !signer) {
      toast.error("Wallet not connected");
      return false;
    }

    setIsLoading(true);

    try {
      // --- PASO CLAVE 1: Obtener el stake requerido directamente del contrato ---
      const disputeData = await contract.disputes(disputeId);
      const jurorStakeAmount = disputeData.jurorStake; // Esto es BigInt (ej. 50000)

      // Setup USDC Contract
      const usdcContract = new Contract(USDC_ADDRESS, ERC20_ABI, signer);

      // Usamos el BigInt directamente del contrato para la aprobación
      const amountToApprove = jurorStakeAmount;

      console.log(`Approving ${amountToApprove.toString()} units for Dispute #${disputeId}`);
      toast.info("Step 1/2: Approving Stake...");

      // 1. Approve (using the exact amount from the contract)
      const approveTx = await usdcContract.approve(sliceAddress, amountToApprove);
      await approveTx.wait();

      toast.success("Stake approved! Joining jury...");

      // 2. Call Join (No value sent)
      const tx = await contract.joinDispute(disputeId);

      toast.info("Confirming Jury Selection...");
      await tx.wait();

      // REMOVED: localStorage logic.
      // The contract now updates 'jurorDisputes' mapping automatically.

      toast.success(`Successfully joined Dispute #${disputeId}!`);
      return true;
    } catch (error: any) {
      console.error("Error joining dispute:", error);
      const msg = error.reason || error.message || "Transaction failed";
      toast.error(`Failed to join: ${msg}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { findActiveDispute, joinDispute, isLoading, isFinding };
}
