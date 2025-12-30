import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: { version: "0.8.28" },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    },
  },
  networks: {
    // Advanced Simulations
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op", // Keeps your Optimism simulation behavior
    },

    // Real Networks (L1)
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },

    //Base Network (Base Sepolia - L2)
    baseSepolia: {
      type: "http",
      chainType: "op", // Base is an OP Stack chain, so we mark it as 'op'
      chainId: 84532,
      url: configVariable("BASE_SEPOLIA_RPC_URL"), // Set this via: npx hardhat vars set BASE_SEPOLIA_RPC_URL
      accounts: [configVariable("DEPLOYER_PRIVATE_KEY")], // Set this via: npx hardhat vars set DEPLOYER_PRIVATE_KEY
    },
  },
});
