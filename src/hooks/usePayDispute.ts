import { useState } from "react";
import { Contract } from "ethers";
import { useSliceContract } from "./useSliceContract";
import { useXOContracts } from "@/providers/XOContractsProvider";
import { toast } from "sonner";
import { sliceAddress } from "@/contracts/slice-abi";
import { erc20Abi } from "@/contracts/erc20-abi";

export function usePayDispute() {
  const { address, signer } = useXOContracts();
  const [isPaying, setIsPaying] = useState(false);
  const contract = useSliceContract();

  const payDispute = async (disputeId: string | number, _amountStr: string) => {
    if (!contract || !address || !signer) {
      toast.error("Please connect your wallet");
      return false;
    }

    setIsPaying(true);

    try {
      // 1. Retrieve the authoritative token address from the contract.
      const stakingTokenAddress = await contract.stakingToken();
      
      // 2. Fetch the exact required stake amount from on-chain data.
      const disputeData = await contract.disputes(disputeId);
      const amountToApprove = disputeData.requiredStake; 

      // 3. Initialize the token contract using the address retrieved from the chain.
      const tokenContract = new Contract(stakingTokenAddress, erc20Abi, signer);

      // 4. Check existing allowance before attempting approval.
      const currentAllowance = await tokenContract.allowance(address, sliceAddress);
      
      if (currentAllowance < amountToApprove) {
        toast.info("Approving Token...");
        const approveTx = await tokenContract.approve(sliceAddress, amountToApprove);
        await approveTx.wait();
        toast.success("Approval confirmed.");
        
        // Brief pause to ensure RPC nodes index the approval transaction.
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // 5. Execute payment.
      toast.info("Paying Dispute...");
      
      // Estimate gas explicitly to detect potential reverts early.
      const estimatedGas = await contract.payDispute.estimateGas(disputeId);
      
      // Apply a 20% gas buffer.
      // Note: Using BigInt() constructor for compatibility with ES2017 targets.
      const gasLimit = (estimatedGas * BigInt(120)) / BigInt(100);

      const tx = await contract.payDispute(disputeId, { gasLimit });
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Payment successful!");
        return true;
      } else {
        throw new Error("Transaction reverted");
      }
    } catch (err: any) {
      console.error("Pay Dispute Error:", err);
      
      if (err.message && err.message.includes("exceeds allowance")) {
        toast.error("Error: Token allowance insufficient. Possible token address mismatch.");
      } else {
        toast.error(`Payment failed: ${err.reason || err.message}`);
      }
      return false;
    } finally {
      setIsPaying(false);
    }
  };

  return { payDispute, isPaying };
}