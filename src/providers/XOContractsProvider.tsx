"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "sonner";
import { BrowserProvider, Signer } from "ethers";
import { useEmbedded } from "./EmbeddedProvider";
import { DEFAULT_CHAIN, defaultChain } from "@/config/chains";
import { useWalletClient, useAccount, useSwitchChain } from "wagmi";
import { walletClientToSigner } from "@/util/ethers-adapter";
import { toHex } from "viem";
import { usePrivy } from "@privy-io/react-auth";

interface Provider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

interface XOContractsContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  address: string | null;
  signer: Signer | null;
  isConnecting: boolean;
}

const XOContractsContext = createContext<XOContractsContextType | null>(null);

export const XOContractsProvider = ({ children }: { children: ReactNode }) => {
  const { isEmbedded } = useEmbedded();

  // --- Global State ---
  const [activeAddress, setActiveAddress] = useState<string | null>(null);
  const [activeSigner, setActiveSigner] = useState<Signer | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // --- Embedded State (XO) ---
  const [xoAddress, setXoAddress] = useState<string | null>(null);
  const [xoSigner, setXoSigner] = useState<Signer | null>(null);
  const initializationAttempted = useRef(false);

  // --- Web/Wagmi State ---
  // Use useAccount for address state (UI), useWalletClient for signer (TXs)
  const { address: wagmiAddress, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const { login, logout } = usePrivy();

  const activeChain = DEFAULT_CHAIN.chain;

  // 1. XO Connection Logic
  const connectXO = useCallback(
    async (silent = false) => {
      setIsConnecting(true);
      try {
        const { XOConnectProvider } = await import("xo-connect");
        const chainIdHex = toHex(activeChain.id);
        const provider: Provider = new XOConnectProvider({
          rpcs: {
            [chainIdHex]: activeChain.rpcUrls.default.http[0],
          },
          defaultChainId: chainIdHex,
        });

        await provider.request({ method: "eth_requestAccounts" });
        const ethersProvider = new BrowserProvider(provider);
        const newSigner = await ethersProvider.getSigner();
        const addr = await newSigner.getAddress();

        setXoSigner(newSigner);
        setXoAddress(addr);
        if (!silent) {
          toast.success(`Connected via XO`);
        }
      } catch (err) {
        console.error("XO Connection Failed:", err);
        if (!silent) {
          toast.error("Failed to connect XO");
        }
      } finally {
        setIsConnecting(false);
      }
    },
    [activeChain],
  );

  // 2. AUTO-CONNECT EFFECT
  useEffect(() => {
    if (isEmbedded && !xoAddress && !initializationAttempted.current) {
      initializationAttempted.current = true;
      connectXO(true);
    }
  }, [isEmbedded, xoAddress, connectXO]);

  // 3. Wagmi/Privy Logic (Web)
  // Updated effect to rely on isConnected/wagmiAddress for UI state
  // src/providers/XOContractsProvider.tsx

  useEffect(() => {
    if (!isEmbedded) {
      // DEBUG LOGS START
      console.log("[XOProvider] Debug State:", {
        isConnected,
        hasWagmiAddress: !!wagmiAddress,
        wagmiAddress,
        hasWalletClient: !!walletClient,
        chainId: walletClient?.chain?.id,
      });
      // DEBUG LOGS END

      if (isConnected && wagmiAddress) {
        // CASE: Connected but on the wrong network (WalletClient is missing)
        if (!walletClient && chain?.id !== defaultChain.id) {
          console.warn(
            `[XOProvider] Wrong Network detected (${chain?.id}). Switching to ${defaultChain.id}...`,
          );
          switchChain({ chainId: defaultChain.id });
          return;
        }

        // CASE: Connected & Correct Network -> Create Signer
        if (walletClient) {
          try {
            const signer = walletClientToSigner(walletClient);
            console.log("[XOProvider] Signer created successfully");
            setActiveSigner(signer);
            setActiveAddress(wagmiAddress);
          } catch (e) {
            console.error("[XOProvider] Error creating signer:", e);
            setActiveSigner(null);
          }
        }
      } else {
        setActiveAddress(null);
        setActiveSigner(null);
      }
    }
  }, [isEmbedded, isConnected, wagmiAddress, walletClient, chain, switchChain]);

  // 4. Sync Logic for Embedded
  useEffect(() => {
    if (isEmbedded) {
      setActiveSigner(xoSigner);
      setActiveAddress(xoAddress);
    }
  }, [xoSigner, xoAddress, isEmbedded]);

  // --- Public Interface ---
  const connect = async () => {
    if (isEmbedded) {
      await connectXO(false);
    } else {
      login();
    }
  };

  const disconnect = async () => {
    if (isEmbedded) {
      setXoAddress(null);
      setXoSigner(null);
    } else {
      await logout();
    }
  };

  return (
    <XOContractsContext.Provider
      value={{
        connect,
        disconnect,
        address: activeAddress,
        signer: activeSigner,
        isConnecting,
      }}
    >
      {children}
    </XOContractsContext.Provider>
  );
};

export const useXOContracts = () => {
  const ctx = useContext(XOContractsContext);
  if (!ctx)
    throw new Error("useXOContracts must be used within XOContractsProvider");
  return ctx;
};
