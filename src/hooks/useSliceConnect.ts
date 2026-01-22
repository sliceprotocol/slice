import { useSupabase } from "@/components/providers/SupabaseProvider";
import { useConnect, useDisconnect } from "wagmi";

export const useSliceConnect = () => {
  const { user, signOut } = useSupabase();
  const { connect: connectWallet, connectors } = useConnect();
  const { disconnect: disconnectWallet } = useDisconnect();

  const connect = async () => {
    // If user is not authenticated, we'll connect wallet directly
    // The ConnectButton will handle showing login modal if needed
    if (connectors && connectors.length > 0) {
      connectWallet({ connector: connectors[0] });
    }
  };

  const disconnect = async () => {
    // Disconnect wallet first
    disconnectWallet();
    // Then sign out from Supabase if user is authenticated
    if (user) {
      await signOut();
    }
  };

  return {
    connect,
    disconnect,
    isAuthenticated: !!user,
  };
};
