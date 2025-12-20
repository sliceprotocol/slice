import { createConfig, http } from "wagmi";
import { activeChains } from "./chains";

export const config = createConfig({
  chains: activeChains,
  transports: {
    // You can even dynamically generate this if you want,
    // or just leave as http() which defaults to public RPCs
    [activeChains[0].id]: http(),
    [activeChains[1]?.id]: http(),
  },
  ssr: true,
});
