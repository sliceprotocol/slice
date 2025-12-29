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
        "0xC0533D1a46c23292d9132336C624175949D6B61f",
      usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia USDC
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
        "0xEdCDEb4d8d7773043ADC8cA956FC9A21422D736b",
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

const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

// Example: Select Base Mainnet (8453) for Prod, Base Sepolia (84532) for Dev
const defaultChainId = isProd ? base.id : baseSepolia.id;

export const DEFAULT_CHAIN_CONFIG =
  SUPPORTED_CHAINS.find((c) => c.chain.id === defaultChainId) ||
  SUPPORTED_CHAINS[0];

export const activeChains = SUPPORTED_CHAINS.map((c) => c.chain) as [
  Chain,
  ...Chain[],
];

export const defaultChain = DEFAULT_CHAIN_CONFIG.chain;
export const DEFAULT_CHAIN = DEFAULT_CHAIN_CONFIG;
