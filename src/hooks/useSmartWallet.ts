import { useAccount, useChainId } from "wagmi";
import { DEFAULT_CHAIN } from "@/config/chains";
import { useEmbedded } from "./useEmbedded";

export function useSmartWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { isEmbedded } = useEmbedded();

  return {
    address,
    chainId,
    isConnected,
    isWrongNetwork: chainId !== DEFAULT_CHAIN.chain.id,
    isEmbedded,
  };
}
