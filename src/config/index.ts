import { createConfig, http } from "wagmi";
import { activeChains } from "./chains";
import { injected } from "wagmi/connectors";

// Switch miniapps
const connectors = [injected()];

const transports = Object.fromEntries(
  activeChains.map((chain) => [chain.id, http()]),
);

export const config = createConfig({
  chains: activeChains,
  transports,
  connectors,
  ssr: true,
});
