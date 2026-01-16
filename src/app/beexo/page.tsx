"use client";

import React, { useState, useEffect } from "react";
import { useConnect, useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Wallet, Send, Loader2, AlertTriangle, Terminal } from "lucide-react";
import { toast } from "sonner";

// Note: No XOConnect imports needed here anymore!
// Wagmi handles it via the connector you added to src/config/index.ts

export default function BeexoPage() {
  // 1. Hook into Global Wagmi Context
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { address, isConnected, chainId } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    console.log(`[Beexo] ${msg}`);
  };

  // 2. Auto-Connect Strategy
  // We check if we are in the Beexo iframe and trigger the specific connector
  useEffect(() => {
    if (
      !isConnected &&
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>)["XOConnect"]
    ) {
      addLog("Found XOConnect environment. Attempting auto-connect...");

      const beexoConnector = connectors.find((c) => c.id === "beexo");

      if (beexoConnector) {
        connect({ connector: beexoConnector });
      } else {
        addLog("❌ Error: 'beexo' connector not found in Global Config.");
      }
    }
  }, [isConnected, connectors, connect]);

  // 3. Connection Success Listener
  useEffect(() => {
    if (isConnected && address) {
      addLog(`✅ Connected to Chain ID: ${chainId}`);
      addLog(`📍 Address: ${address}`);
      toast.success("Connected successfully");
    }
  }, [isConnected, address, chainId]);

  // 4. Manual Connect Handler
  const handleConnect = () => {
    addLog("Manual connection requested...");
    const beexoConnector = connectors.find((c) => c.id === "beexo");

    if (beexoConnector) {
      connect(
        { connector: beexoConnector },
        {
          onSuccess: () => addLog("Handshake successful."),
          onError: (err) => {
            addLog(`❌ Connection Failed: ${err.message}`);
            toast.error(err.message || "Failed to connect");
          },
        },
      );
    } else {
      addLog("❌ Beexo Connector not found. Check src/config/index.ts");
    }
  };

  // 5. Send Transaction Handler
  const handleSendTransaction = async () => {
    if (!address) return;
    addLog("Initiating Transaction via Wagmi...");

    try {
      const amount = parseEther("0.00001");
      const to = "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29"; // Demo address

      addLog(`Sending ${formatEther(amount)} ETH to ${to}...`);

      // Wagmi automatically uses the Beexo Provider to sign this
      const hash = await sendTransactionAsync({
        to,
        value: amount,
      });

      addLog(`✅ Tx Sent! Hash: ${hash}`);
      toast.success("Transaction sent!");
    } catch (err: any) {
      console.error(err);
      // Wagmi wraps errors, so we look for shortMessage or message
      addLog(`❌ Tx Error: ${err.shortMessage || err.message}`);
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-manrope">
      {/* Header */}
      <div className="px-6 py-6 bg-white shadow-sm z-10">
        <h1 className="text-2xl font-extrabold text-[#1b1c23] flex items-center gap-2">
          <span className="text-blue-600">Base</span> Integration
        </h1>
        <p className="text-xs font-medium text-gray-400 mt-1">
          Global Wagmi Config + Beexo Connector
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Connection Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
            <Wallet className="w-8 h-8" />
          </div>

          {!isConnected ? (
            <>
              <h2 className="text-lg font-bold text-[#1b1c23]">
                Connect Beexo Wallet
              </h2>
              <p className="text-sm text-gray-500 max-w-[200px]">
                Establish a connection via the XO Protocol bridge.
              </p>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3.5 bg-[#1b1c23] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Connected Address
                </span>
                <span className="text-sm font-mono font-bold text-[#1b1c23] bg-gray-100 px-3 py-1 rounded-lg mt-1 break-all">
                  {address}
                </span>
                <span className="text-xs font-bold text-gray-400 mt-2">
                  Balance:{" "}
                  {balanceData
                    ? Number(balanceData.formatted).toFixed(5)
                    : "..."}{" "}
                  ETH
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Card */}
        {isConnected && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#1b1c23]">Actions</h3>

            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">
                <strong>CAUTION:</strong> This is <strong>Base Mainnet</strong>{" "}
                (Chain {chainId}). Sending <strong>0.00001 ETH</strong> real
                funds.
              </p>
            </div>

            <button
              onClick={handleSendTransaction}
              disabled={isSending}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sign & Send...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Transaction
                </>
              )}
            </button>
          </div>
        )}

        {/* Debug Log Console */}
        <div className="bg-[#1b1c23] rounded-3xl p-5 flex flex-col gap-3 min-h-[200px]">
          <div className="flex items-center gap-2 text-white/50 border-b border-white/10 pb-2">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Live Logs
            </span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[200px] font-mono text-[10px] space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 pr-2">
            {logs.length === 0 && (
              <span className="text-white/20 italic">
                Waiting for events...
              </span>
            )}
            {logs.map((log, i) => (
              <div
                key={i}
                className="text-white/80 break-words border-l-2 border-orange-500 pl-2"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
