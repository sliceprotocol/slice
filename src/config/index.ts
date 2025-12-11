// 1. Import Base networks directly from Reown
import { baseSepolia, base } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const projectIdRaw = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectIdRaw) throw new Error("Project ID is not defined");
export const projectId = projectIdRaw;

// 2. Update networks array (use base or baseSepolia as default)
export const networks: [typeof baseSepolia, typeof base] = [baseSepolia, base];

// 3. Pass to Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }) as any,
  ssr: true,
  projectId: projectId as string,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

export const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // Base Sepolia USDC
