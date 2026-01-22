"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TimerProvider } from "@/contexts/TimerContext";
import { Tenant } from "@/config/tenant";
import * as Privy from "@/config/adapters/privy";
import * as Beexo from "@/config/adapters/beexo";
import * as Coinbase from "@/config/adapters/coinbase";

interface Props {
  children: ReactNode;
  tenant: Tenant;
  initialState?: any;
}

// Shared providers used across all tenants
function SharedProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TimerProvider>{children}</TimerProvider>
    </QueryClientProvider>
  );
}

export default function ContextProvider({
  children,
  tenant,
  initialState,
}: Props) {
  // Select adapter based on tenant
  switch (tenant) {
    case Tenant.PRIVY:
      return (
        <Privy.PrivyProviderTree initialState={initialState}>
          <Privy.PrivyAuthAdapter>
            <SharedProviders>{children}</SharedProviders>
          </Privy.PrivyAuthAdapter>
        </Privy.PrivyProviderTree>
      );

    case Tenant.BEEXO:
      return (
        <Beexo.BeexoProviderTree initialState={initialState}>
          <Beexo.BeexoAuthAdapter>
            <SharedProviders>{children}</SharedProviders>
          </Beexo.BeexoAuthAdapter>
        </Beexo.BeexoProviderTree>
      );

    case Tenant.WEB:
    default:
      return (
        <Coinbase.CoinbaseProviderTree initialState={initialState}>
          <Coinbase.CoinbaseAuthAdapter>
            <SharedProviders>{children}</SharedProviders>
          </Coinbase.CoinbaseAuthAdapter>
        </Coinbase.CoinbaseProviderTree>
      );
  }
}

