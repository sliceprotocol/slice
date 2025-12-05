"use client"
import { createContext, useState, useContext, ReactNode } from "react";

// Simple context shape
export interface WalletContextType {
  address?: string;
  isPending: boolean;
  connect: () => void;
  disconnect: () => void;
  signTransaction?: (xdr: string) => Promise<any>; // Kept to prevent TS errors in components
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const connect = () => {
    setIsPending(true);
    setTimeout(() => {
      // Set a dummy address to simulate connection
      setAddress("0x71C...EVM...User");
      setIsPending(false);
    }, 500);
  };

  const disconnect = () => setAddress(undefined);

  return (
    <WalletContext.Provider
      value={{
        address,
        isPending,
        connect,
        disconnect,
        signTransaction: async () => ({}), // No-op
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
