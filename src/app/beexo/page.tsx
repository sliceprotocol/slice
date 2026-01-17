"use client";

import { useState, useEffect } from "react";
import { useConnect, useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";
import { Wallet, Loader2, AlertTriangle, Terminal } from "lucide-react";
import { toast } from "sonner";

export default function BeexoPage() {
  const { connect, connectors } = useConnect();
  const { address, isConnected, chainId } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();

  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    console.log(`[Beexo] ${msg}`);
  };

  // 1. Auto-Connect
  useEffect(() => {
    // We don't need to search by ID anymore, there is likely only 1 connector (Beexo)
    // But we check just to be safe.
    if (
      !isConnected &&
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>)["XOConnect"]
    ) {
      addLog("Auto-connecting to Beexo...");
      const connector = connectors[0]; // Grab the first/only connector
      if (connector) connect({ connector });
    }
  }, [isConnected, connectors, connect]);

  // 2. Debug Logs
  useEffect(() => {
    if (isConnected && address) {
      addLog(`✅ Connected: ${address}`);
      addLog(`🔗 Chain ID: ${chainId} (Expect 8453)`);
      if (chainId !== 8453) addLog("⚠️ WRONG CHAIN DETECTED");
    }
  }, [isConnected, address, chainId]);

  const handleSendTransaction = async () => {
    if (!address) return;
    addLog("Initiating Transaction...");

    try {
      const amount = parseEther("0.00001");
      const to = "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29";

      addLog(`Sending ${formatEther(amount)} ETH on Chain ${chainId}...`);

      const hash = await sendTransactionAsync({
        to,
        value: amount,
      });

      addLog(`✅ Tx Sent! Hash: ${hash}`);
      toast.success("Transaction sent!");
    } catch (err: any) {
      console.error(err);
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
          Isolated Wagmi Context + Base Mainnet
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
            <Wallet className="w-8 h-8" />
          </div>

          {!isConnected ? (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="w-full py-3.5 bg-[#1b1c23] text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Connected Address
              </span>
              <span className="text-sm font-mono font-bold text-[#1b1c23] bg-gray-100 px-3 py-1 rounded-lg mt-1 break-all">
                {address}
              </span>
              <span className="text-xs font-bold text-gray-400 mt-2">
                Balance:{" "}
                {balanceData ? Number(balanceData.formatted).toFixed(5) : "..."}{" "}
                ETH
              </span>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">
                <strong>CAUTION:</strong> Using Base Mainnet (Chain {chainId}).
              </p>
            </div>
            <button
              onClick={handleSendTransaction}
              disabled={isSending}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send 0.00001 ETH"
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
          <div className="flex-1 overflow-y-auto max-h-[200px] font-mono text-[10px] space-y-1.5 pr-2">
            {logs.map((log, i) => (
              <div
                key={i}
                className="text-white/80 border-l-2 border-orange-500 pl-2"
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
