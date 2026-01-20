import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

export const useSliceAccount = () => {
    const { address, isConnected, status } = useAccount();
    const { user, ready, authenticated } = usePrivy();

    // Unified address resolution
    // We prefer the Wagmi address as it's the one used for transactions
    // but fallback to Privy's wallet address if available (e.g. for display in some states)
    const unifiedAddress = address || user?.wallet?.address;

    return {
        address: unifiedAddress,
        isConnected: isConnected || authenticated,
        userId: user?.id,
        status,
        isReady: ready,
    };
};
