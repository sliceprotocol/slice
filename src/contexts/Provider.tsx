"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider as PrivyWagmiProvider } from "@privy-io/wagmi";
import {
  WagmiProvider as VanillaWagmiProvider,
  cookieToInitialState,
} from "wagmi";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/config/app";
import { config } from "@/config";

const queryClient = new QueryClient();

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies?: string | null;
}) {
  const initialState = cookieToInitialState(config, cookies);

  const isEmbedded = process.env.NEXT_PUBLIC_IS_EMBEDDED === "true";

  const ActiveWagmiProvider = isEmbedded
    ? VanillaWagmiProvider
    : PrivyWagmiProvider;

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#1b1c23",
          logo: "/images/slice-logo-light.svg",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        loginMethods: ["email", "wallet"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ActiveWagmiProvider config={config} initialState={initialState}>
          {children}
        </ActiveWagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
