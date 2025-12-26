import { useState } from "react";
import { toast } from "sonner";

/**
 * A generic hook to handle contract transactions with loading states and toasts.
 */
export function useContractTx() {
    const [isProcessing, setIsProcessing] = useState(false);

    const execute = async (
        actionName: string,
        txPromise: () => Promise<any>
    ): Promise<boolean> => {
        setIsProcessing(true);
        // toast.loading(`Processing ${actionName}...`, { id: actionName }); 
        // ^ Optional: use ID to replace toast on success

        try {
            const tx = await txPromise();
            toast.info("Transaction sent. Waiting for confirmation...");

            await tx.wait(); // Wait for block confirmation

            toast.success(`${actionName} successful!`);
            return true;
        } catch (error: any) {
            console.error(`${actionName} Error:`, error);
            const msg = error.reason || error.shortMessage || error.message || "Unknown error";

            if (msg.includes("user rejected")) {
                toast.error("Transaction cancelled.");
            } else {
                toast.error(`${actionName} failed: ${msg}`);
            }
            return false;
        } finally {
            setIsProcessing(false);
            // toast.dismiss(actionName);
        }
    };

    return { execute, isProcessing };
}
