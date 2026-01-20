import { usePrivy } from "@privy-io/react-auth";
import { useDisconnect } from "wagmi";

export const useSliceConnect = () => {
  const { login, logout: privyLogout } = usePrivy();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const connect = async () => {
    login();
  };

  const disconnect = async () => {
    // 1. Try Privy Logout (Server-side session kill)
    // We wrap this in a try/catch so a 400 error (missing token) doesn't stop execution
    try {
      await privyLogout();
    } catch (e) {
      console.warn("Privy logout warning (session might be already inactive):", e);
    }

    // 2. Force Wagmi Disconnect (Client-side wallet kill)
    // This is crucial for MetaMask to update the UI (isConnected: false)
    wagmiDisconnect();
  };

  return {
    connect,
    disconnect,
  };
};
