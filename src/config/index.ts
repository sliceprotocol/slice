import { createConfig, http } from "wagmi";
import { activeChains } from "./chains";
import { injected, walletConnect } from "wagmi/connectors";
import { xoConnector } from "@/wagmi/xoConnector";

const isEmbedded = process.env.NEXT_PUBLIC_IS_EMBEDDED === "true";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "default_project_id";

const connectors = isEmbedded
  ? [xoConnector()]
  : [injected(), walletConnect({ projectId })];

const transports = Object.fromEntries(
  activeChains.map((chain) => [chain.id, http()]),
);

export const config = createConfig({
  chains: activeChains,
  transports,
  connectors,
  ssr: true,
});
