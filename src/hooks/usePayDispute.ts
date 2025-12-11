import { useState } from "react";
import { Contract, parseUnits } from "ethers";
import { useSliceContract } from "./useSliceContract";
import { useXOContracts } from "@/providers/XOContractsProvider";
import { toast } from "sonner";
import { USDC_ADDRESS } from "@/config"; // Import your USDC address
import { sliceAddress } from "@/contracts/slice-abi"; // Import Slice address
import { erc20Abi } from "@/contracts/erc20-abi";

export function usePayDispute() {
  const { address, signer } = useXOContracts();
  const [isPaying, setIsPaying] = useState(false);
  const contract = useSliceContract();

  const payDispute = async (disputeId: string | number, amountStr: string) => {
    if (!contract || !address || !signer) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsPaying(true);

    try {
      // 1. Prepare USDC Contract
      const usdcContract = new Contract(USDC_ADDRESS, erc20Abi, signer);

      // 2. Parse Amount (USDC usually has 6 decimals, check your token!)
      // If using standard USDC:
      const amountToApprove = parseUnits(amountStr, 6);

      console.log(`Approving ${amountStr} USDC...`);
      toast.info("Step 1/2: Approving USDC...");

      // 3. Approve Slice Contract to spend User's USDC
      const approveTx = await usdcContract.approve(sliceAddress, amountToApprove);
      await approveTx.wait();

      toast.success("Approval successful! Proceeding to payment...");
      console.log("Approval confirmed:", approveTx.hash);

      // 4. Call payDispute (No value needed now)
      toast.info("Step 2/2: Confirming Payment...");

      const tx = await contract.payDispute(disputeId);
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Payment successful! Funds locked.");
        return true;
      } else {
        throw new Error("Transaction reverted");
      }
    } catch (err: any) {
      console.error("Pay Dispute Error:", err);
      const msg = err.reason || err.message || "Unknown error";
      toast.error(`Payment failed: ${msg}`);
      return false;
    } finally {
      setIsPaying(false);
    }
  };

  return { payDispute, isPaying };
}
