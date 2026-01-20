import { baseSepolia, base } from "wagmi/chains";
import type { Chain } from "viem";

export type ChainConfig = {
  chain: Chain;
  contracts: {
    slice: string;
    usdc: string;
  };
};

// 1. Define configurations
const SEPOLIA_CONFIG: ChainConfig = {
  chain: baseSepolia,
  contracts: {
    slice: process.env.NEXT_PUBLIC_BASE_SEPOLIA_SLICE_CONTRACT!,
    usdc: process.env.NEXT_PUBLIC_BASE_SEPOLIA_USDC_CONTRACT!,
  },
};

const MAINNET_CONFIG: ChainConfig = {
  chain: base,
  contracts: {
    slice: process.env.NEXT_PUBLIC_BASE_SLICE_CONTRACT!,
    usdc: process.env.NEXT_PUBLIC_BASE_USDC_CONTRACT!,
  },
};

// 2. Determine Environment
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

// 3. Dynamic Export: Target chain is ALWAYS first
export const SUPPORTED_CHAINS: ChainConfig[] = isProd
  ? [MAINNET_CONFIG, SEPOLIA_CONFIG] // Prod: Base First
  : [SEPOLIA_CONFIG, MAINNET_CONFIG]; // Dev: Sepolia First

export const DEFAULT_CHAIN_CONFIG = SUPPORTED_CHAINS[0];
export const defaultChain = DEFAULT_CHAIN_CONFIG.chain;
export const DEFAULT_CHAIN = DEFAULT_CHAIN_CONFIG;

// 4. Export plain chain objects for Wagmi
export const activeChains = SUPPORTED_CHAINS.map((c) => c.chain) as [
  Chain,
  ...Chain[],
];
