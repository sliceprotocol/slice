import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import React from "react";
import ContextProvider from "./providers";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ConsoleOverlay } from "@/components/debug/ConsoleOverlay";
import { getTenantFromHost, Tenant } from "@/config/tenant";
import { beexoConfig } from "@/adapters/beexo";
import { webConfig } from "@/adapters/web";
import { cookieToInitialState } from "wagmi";

export const metadata: Metadata = {
  title: "Slice",
  description: "Get paid for doing justice",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/slice-logo-light.svg",
    apple: "/icons/icon.png",
  },
  other: {
    "base:app_id": "6966f2640c770beef0486121",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Server-Side Detection
  const headersList = await headers();
  const host = headersList.get("host"); // e.g. "beexo.slicehub.xyz"
  const tenant = getTenantFromHost(host);

  // Use headersList, not headersData
  const cookies = headersList.get("cookie");

  // Ensure Tenant is imported so Tenant.BEEXO works
  const initialState = cookieToInitialState(
    tenant === Tenant.BEEXO ? beexoConfig : webConfig,
    cookies,
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center min-h-screen bg-gray-100`}
      >
        {/* Pass initialState, NOT cookies */}
        <ContextProvider tenant={tenant} initialState={initialState}>
          <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative flex flex-col">
            <div className="flex-1 flex flex-col pb-[70px]">{children}</div>

            <BottomNavigation />
            <ConsoleOverlay />
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
