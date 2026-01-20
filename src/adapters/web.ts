import { createConfig, http } from "wagmi";
import { activeChains } from "@/config/chains";
import { injected } from "wagmi/connectors";

export const webConfig = createConfig({
    chains: activeChains,
    transports: Object.fromEntries(activeChains.map((chain) => [chain.id, http()])),
    connectors: [injected()],
    ssr: true,
});
