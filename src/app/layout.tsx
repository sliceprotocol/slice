import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import React from "react";
import ContextProvider from "./providers";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ConsoleOverlay } from "@/components/debug/ConsoleOverlay";

export const metadata: Metadata = {
  title: "Slice",
  description: "Get paid for doing justice",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/slice-logo-light.svg",
    apple: "/icons/icon.png",
  },
  other: {
    "base:app_id": "696694666622bd23811761ec",
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
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center min-h-screen bg-gray-100`}
      >
        <ContextProvider cookies={cookies}>
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
