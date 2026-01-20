"use client";

import {ReactNode, useEffect} from "react";
import { Tenant } from "@/config/tenant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. WEB STACK IMPORTS
import { WagmiProvider } from "wagmi";
import { webConfig } from "@/config";
import { SupabaseProvider } from "@/components/providers/SupabaseProvider";

// 2. BEEXO STACK IMPORTS
import { beexoConfig } from "@/config/beexoConfig";

// Common Contexts
import { TimerProvider } from "@/contexts/TimerContext";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
  tenant: Tenant;
  initialState?: any;
}

export default function ContextProvider({ children, tenant, initialState }: Props) {
  // STRATEGY: BEEXO (Pure Wagmi)
  if (tenant === Tenant.BEEXO) {
    return (
      <WagmiProvider config={beexoConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <TimerProvider>
            {/* Beexo doesn't need Supabase Auth */}
            {children}
          </TimerProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  // STRATEGY B: WEB / DEFAULT (Supabase Auth + Wagmi)
  return (
    <SupabaseProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={webConfig} initialState={initialState}>
          <TimerProvider>{children}</TimerProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </SupabaseProvider>
  );
}