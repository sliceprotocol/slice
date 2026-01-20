import { SUPPORTED_CHAINS, DEFAULT_CHAIN } from "./chains";

export const getContractsForChain = (chainId: number) => {
  const config = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId);

  if (!config) {
    console.warn(`Chain ID ${chainId} not found in config, using default.`);
    return {
      sliceContract: DEFAULT_CHAIN.contracts.slice as `0x${string}`,
      usdcToken: DEFAULT_CHAIN.contracts.usdc as `0x${string}`,
    };
  }

  return {
    sliceContract: config.contracts.slice as `0x${string}`,
    usdcToken: config.contracts.usdc as `0x${string}`,
  };
};

import { sliceAbi } from "@/contracts/slice-abi";
export const SLICE_ABI = sliceAbi;
