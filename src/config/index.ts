import { createConfig, http } from "wagmi";
import { activeChains } from "./chains";
import { injected } from "wagmi/connectors";
import { beexoConnector } from "./beexoConnector";

const transports = Object.fromEntries(
  activeChains.map((chain) => [chain.id, http()]),
);

// Switch miniapps
const connectors = [injected(), beexoConnector()];

export const webConfig = createConfig({
  chains: activeChains,
  transports,
  connectors,
  ssr: true,
});
