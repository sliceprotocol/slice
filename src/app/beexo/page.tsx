"use client";

import { useState, useEffect } from "react";
import { XOConnectProvider, XOConnect } from "xo-connect";
import { createWalletClient, custom, parseEther, formatEther } from "viem";
import { base } from "viem/chains";
import { Wallet, Send, Loader2, AlertTriangle, Terminal } from "lucide-react";
import { toast } from "sonner";

// Configuration for Base Mainnet
const CHAIN_ID_HEX = "0x2105"; // 8453 (Base Mainnet)
const RPC_URL = "https://mainnet.base.org"; // Public RPC for Mainnet

export default function BeexoPage() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [walletClient, setWalletClient] = useState<any>(null);

  // Helper to add debug logs to UI
  const addLog = (msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    console.log(`[Beexo] ${msg}`);
  };

  // 1. Initialize Provider
  useEffect(() => {
    try {
      addLog("Initializing XOConnectProvider...");

      // The Provider acts as the EIP-1193 bridge
      const provider = new XOConnectProvider({
        rpcs: {
          [CHAIN_ID_HEX]: RPC_URL,
        },
        defaultChainId: CHAIN_ID_HEX,
      });

      // Create a Viem Wallet Client using the XO provider as custom transport
      const client = createWalletClient({
        chain: base,
        transport: custom(provider as any),
      });

      addLog("Client is: " + client);
      setWalletClient(client);
      addLog("Viem Client ready with XO Transport.");
    } catch (err: any) {
      addLog(`Init Error: ${err.message}`);
    }
  }, []);

  // 2. Connect Action
  const handleConnect = async () => {
    setIsConnecting(true);
    addLog("--- STARTING DEBUG SEQUENCE ---");

    try {
      // CHECK 1: Is the bridge injected?
      if (
        typeof window !== "undefined" &&
        !(window as unknown as Record<string, unknown>)["XOConnect"]
      ) {
        addLog("❌ CRITICAL: window.XOConnect is undefined.");
        addLog("   -> You are likely NOT in the Beexo environment.");
        addLog("   -> The library will hang for 5s then fail.");
      } else {
        addLog("✅ window.XOConnect found. Bridge is active.");
      }

      // CHECK 2: Initialize Provider
      addLog("1. Initializing Provider...");
      const provider = new XOConnectProvider({
        rpcs: { [CHAIN_ID_HEX]: RPC_URL },
        defaultChainId: CHAIN_ID_HEX,
      });

      const client = createWalletClient({
        chain: base, // <--- CHANGED: Use Base Mainnet
        transport: custom(provider as any),
      });
      setWalletClient(client);
      addLog("✅ Provider initialized.");

      // CHECK 3: The Handshake
      addLog("2. Calling requestAddresses (Handshake started)...");
      addLog("   -> If this hangs >5s, the Wallet is not replying.");
      addLog(
        "   -> If it hangs ~10s, the Signature Verification failed silently.",
      );

      const addresses = (await Promise.race([
        client.requestAddresses(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("TIMEOUT_MONITOR: Operation took >15s")),
            15000,
          ),
        ),
      ])) as string[];

      addLog(`3. Handshake returned. Data: ${JSON.stringify(addresses)}`);

      // CHECK 4: Account Validation
      if (!addresses || addresses.length === 0) {
        addLog("⚠️ Connected, but NO accounts returned.");
        addLog(`   -> Wallet might not support Chain ID: ${CHAIN_ID_HEX}`);

        // --- RAW DATA INSPECTION ---
        addLog("🕵️ INSPECTING RAW WALLET DATA...");
        try {
          const rawClient = await XOConnect.getClient();

          if (!rawClient) {
            addLog("❌ Raw client is null (unexpected).");
          } else {
            addLog(`Client Alias: ${rawClient.alias}`);
            addLog("--- SUPPORTED CURRENCIES ---");

            if (rawClient.currencies && rawClient.currencies.length > 0) {
              rawClient.currencies.forEach((c: any, i: number) => {
                addLog(`[${i}] ID: ${c.id}`);
                addLog(`    ChainID: ${c.chainId} (Type: ${typeof c.chainId})`);
                addLog(`    Address: ${c.address}`);
              });
            } else {
              addLog("❌ Wallet returned EMPTY currencies array.");
            }
          }
        } catch (debugErr: any) {
          addLog(`❌ Debug Inspection Failed: ${debugErr.message}`);
        }
        // --- END RAW DATA INSPECTION ---

        return;
      }

      const account = addresses[0];
      setAddress(account);
      addLog(`✅ SUCCESS: Connected to ${account}`);
      toast.success("Connection Successful");

      // Fetch Balance
      fetchBalance(account);
    } catch (err: any) {
      addLog("❌ FATAL ERROR CAUGHT:");
      addLog(`   Message: ${err.message}`);

      if (err.message.includes("No connection available")) {
        addLog("   [Analysis]: 'window.XOConnect' was never found.");
      }
      if (err.message.includes("Invalid signature")) {
        addLog("   [Analysis]: Wallet signed data, but verification failed.");
      }
      if (err.message.includes("TIMEOUT_MONITOR")) {
        addLog("   [Analysis]: The handshake exceeded 15s timeout.");
        addLog("   [Analysis]: Wallet is not responding to postMessage.");
      }

      toast.error("Connection Failed");
    } finally {
      setIsConnecting(false);
      addLog("--- END SEQUENCE ---");
    }
  };

  const fetchBalance = async (addr: string) => {
    try {
      const res = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [addr, "latest"],
        }),
      });
      const json = await res.json();
      if (json.result) {
        setBalance(formatEther(BigInt(json.result)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 3. Send Transaction Action
  const handleSendTransaction = async () => {
    if (!walletClient || !address) return;
    setIsSending(true);
    addLog("Initiating Transaction...");

    try {
      // 0.00001 ETH (Reduced amount for Mainnet Safety)
      const amount = parseEther("0.00001");

      // Recipient
      const to = "0x3AE66a6DB20fCC27F3DB3DE5Fe74C108A52d6F29";

      addLog(`Sending ${formatEther(amount)} ETH to ${to}...`);

      const hash = await walletClient.sendTransaction({
        account: address as `0x${string}`,
        to,
        value: amount,
      });

      addLog(`Tx Sent! Hash: ${hash}`);
      toast.success("Transaction sent!");
      toast.info("Check console for hash details");
    } catch (err: any) {
      console.error(err);
      addLog(`Tx Error: ${err.message || err.shortMessage}`);
      toast.error("Transaction failed");
    } finally {
      setIsSending(false);
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
          XOConnect + Viem + Base Mainnet (0x2105)
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Connection Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
            <Wallet className="w-8 h-8" />
          </div>

          {!address ? (
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
                  Balance: {Number(balance).toFixed(5)} ETH
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Card */}
        {address && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#1b1c23]">Actions</h3>

            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">
                <strong>CAUTION:</strong> This is <strong>Base Mainnet</strong>.
                This action will send <strong>0.00001 ETH</strong> (Real Funds).
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
