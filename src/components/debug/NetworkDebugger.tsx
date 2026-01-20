"use client";

import { useAccount } from "wagmi";
import { defaultChain } from "@/config/chains";

export const NetworkDebugger = () => {
  // Destructure chainId directly. It is more reliable than chain object.
  const { chainId, isConnected, address } = useAccount();

  // Logic: Compare explicit IDs
  const targetChainId = defaultChain.id;
  const actualChainId = chainId || "N/A";
  const isMatch = actualChainId === targetChainId;

  if (!address) return null;

  return (
    <div className="fixed bottom-18 right-6 p-4 bg-black/90 text-white text-[10px] font-mono rounded-2xl z-9999 border border-white/10 shadow-2xl backdrop-blur-md w-64 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-indigo-400 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          NETWORK INSPECTOR
        </h3>
      </div>

      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-tighter">Mode</span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-300">
            {/* Display Environment for clarity */}
            {process.env.NEXT_PUBLIC_APP_ENV?.toUpperCase()}
          </span>
        </div>
        <div className="h-px bg-white/5 w-full" />

        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-tighter">
            Target_ID
          </span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-indigo-400">
            {targetChainId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-tighter">
            Actual_ID
          </span>
          <span
            className={`bg-white/5 px-1.5 py-0.5 rounded ${
              isMatch ? "text-indigo-400" : "text-red-400"
            }`}
          >
            {actualChainId}
          </span>
        </div>
        <div className="h-px bg-white/5 w-full" />
        <div className="flex justify-between items-center">
          <span className="text-gray-500 uppercase tracking-tighter">
            Status
          </span>
          {isConnected ? (
            <span className="text-indigo-400">CONNECTED</span>
          ) : (
            <span className="text-red-500 animate-pulse">DISCONNECTED</span>
          )}
        </div>
      </div>
    </div>
  );
};
