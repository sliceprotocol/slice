import { baseSepolia, base, scrollSepolia, scroll } from "wagmi/chains";

import type { Chain } from "viem";

export type ChainConfig = {
  chain: Chain;
  contracts: {
    slice: string;
    usdc: string;
  };
};

// Centralized configuration list
export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    chain: baseSepolia,
    contracts: {
      slice:
        process.env.NEXT_PUBLIC_BASE_SLICE_CONTRACT ||
        "0xD8A10bD25e0E5dAD717372fA0C66d3a59a425e4D",
      usdc: "0x5dEaC602762362FE5f135FA5904351916053cF70", // Base Sepolia USDC
    },
  },
  {
    chain: scrollSepolia,
    contracts: {
      slice:
        process.env.NEXT_PUBLIC_SCROLL_SLICE_CONTRACT ||
        "0x095815CDcf46160E4A25127A797D33A9daF39Ec0",
      usdc: "0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D", // Scroll Sepolia USDC
    },
  },
  {
    chain: base,
    contracts: {
      slice:
        process.env.NEXT_PUBLIC_BASE_SLICE_CONTRACT ||
        "0xD8A10bD25e0E5dAD717372fA0C66d3a59a425e4D",
      usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet USDC
    },
  },
  {
    chain: scroll,
    contracts: {
      slice:
        process.env.NEXT_PUBLIC_SCROLL_SLICE_CONTRACT ||
        "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",
      usdc: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4", // Scroll Mainnet USDC
    },
  },
];

// Determine the default environment (Safe fallback to first item)
export const DEFAULT_CHAIN_CONFIG = SUPPORTED_CHAINS[0];

// EXPORT CLEAN VARIABLES FOR LIBRARIES (Wagmi / Privy)
// This extracts just the chain objects (e.g. [baseSepolia, scrollSepolia])
export const activeChains = SUPPORTED_CHAINS.map((c) => c.chain) as [
  Chain,
  ...Chain[],
];

// Helper to get the default/active chain (usually the first one in the list for dev)
export const defaultChain = DEFAULT_CHAIN_CONFIG.chain;

// Full Config (Used by components for contract addresses)
export const DEFAULT_CHAIN = SUPPORTED_CHAINS[0];
