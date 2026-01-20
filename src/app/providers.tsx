"use client";

import { ReactNode } from "react";
import { Tenant } from "@/config/tenant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider as PrivyWagmiProvider } from "@privy-io/wagmi";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { TimerProvider } from "@/contexts/TimerContext";
import { beexoConfig } from "@/adapters/beexo";
import { webConfig } from "@/adapters/web";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/config/app";
import { activeChains, defaultChain } from "@/config/chains";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  tenant: Tenant;
  initialState?: any;
}

export default function ContextProvider({
  children,
  tenant,
  initialState,
}: Props) {
  // STRATEGY: BEEXO (Pure Wagmi)
  if (tenant === Tenant.BEEXO) {
    return (
      <WagmiProvider config={beexoConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>{children}</TimerProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // STRATEGY: WEB (Privy + Wagmi)
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        defaultChain: defaultChain,
        supportedChains: activeChains,
        appearance: {
          theme: "light",
          accentColor: "#1b1c23",
          logo: "/images/slice-logo-light.svg",
        },
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
        },
        loginMethods: ["email", "wallet"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <PrivyWagmiProvider config={webConfig} initialState={initialState}>
          <SmartWalletsProvider>
            <TimerProvider>{children}</TimerProvider>
          </SmartWalletsProvider>
        </PrivyWagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
