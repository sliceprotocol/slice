"use client";

import { ReactNode } from "react";
import { Tenant } from "@/config/tenant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. WEB STACK IMPORTS
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider as PrivyWagmiProvider } from "@privy-io/wagmi";
import { webConfig } from "@/config";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/config/app";
import { activeChains, defaultChain } from "@/config/chains";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

// 2. BEEXO STACK IMPORTS
import { WagmiProvider } from "wagmi";
import { beexoConfig } from "@/config/beexoConfig";

// Common Contexts
import { TimerProvider } from "@/contexts/TimerContext";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  tenant: Tenant; // Decision Variable
  initialState?: any; // For Wagmi Cookie Hydration (Advanced)
}

export default function ContextProvider({
  children,
  tenant,
  initialState,
}: Props) {
  // STRATEGY A: BEEXO (Simple, Pure Wagmi)
  if (tenant === Tenant.BEEXO) {
    return (
      <WagmiProvider config={beexoConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>
            {/* Beexo doesn't need SmartWalletsProvider or Privy */}
            {children}
          </TimerProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // STRATEGY B: WEB / DEFAULT (Privy + Wagmi)
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
