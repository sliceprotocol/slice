"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Shield,
  Gavel,
  Eye,
  Database,
  Terminal,
  CheckCircle,
  Dices,
  Hash,
} from "lucide-react";
import { useSliceContract } from "@/hooks/useSliceContract";
import { useXOContracts } from "@/providers/XOContractsProvider";
import { useSliceVoting } from "@/hooks/useSliceVoting";
import { parseEther, formatEther } from "ethers";
import { toast } from "sonner";
import { calculateCommitment, generateSalt } from "@/util/votingUtils";

export default function DebugPage() {
  const router = useRouter();
  const { address } = useXOContracts();
  const contract = useSliceContract();
  const { commitVote, revealVote, isProcessing, logs } = useSliceVoting();

  // --- State ---
  const [targetId, setTargetId] = useState("1");
  const [contractInfo, setContractInfo] = useState<any>(null);
  const [rawDisputeData, setRawDisputeData] = useState<any>(null);
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // --- Tool State ---
  const [toolSalt, setToolSalt] = useState("");
  const [toolVote, setToolVote] = useState<number>(1); // Default to 1 (Claimant)
  const [toolHash, setToolHash] = useState("");

  // --- Fetch Contract Global Info ---
  // Wrapped in useCallback to fix the dependency warning
  const refreshContractInfo = useCallback(async () => {
    if (!contract) return;
    try {
      const count = await contract.disputeCount();
      setContractInfo({ count: count.toString() });
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch contract info");
    }
  }, [contract]);

  // --- Fetch Raw Dispute Data ---
  const fetchRawDispute = async () => {
    if (!contract || !targetId) return;
    setIsLoadingData(true);
    try {
      const d = await contract.disputes(targetId);
      const statusLabels = ["Created", "Commit", "Reveal", "Executed"];

      const formatted = {
        id: d.id.toString(),
        statusIndex: Number(d.status),
        status: statusLabels[Number(d.status)] || "Unknown",
        claimer: d.claimer,
        defender: d.defender,
        category: d.category,
        jurorsRequired: d.jurorsRequired.toString(),
        requiredStake: formatEther(d.requiredStake) + " ETH",
        payDeadline:
          d.payDeadline > 0
            ? new Date(Number(d.payDeadline) * 1000).toLocaleString()
            : "Not Set",
        commitDeadline:
          d.commitDeadline > 0
            ? new Date(Number(d.commitDeadline) * 1000).toLocaleString()
            : "Not Set",
        revealDeadline:
          d.revealDeadline > 0
            ? new Date(Number(d.revealDeadline) * 1000).toLocaleString()
            : "Not Set",
        ipfsHash: d.ipfsHash || "None",
        winner:
          d.winner === "0x0000000000000000000000000000000000000000"
            ? "None"
            : d.winner,
      };
      setRawDisputeData(formatted);
      refreshLocalStorage();
    } catch (e) {
      console.error(e);
      toast.error(`Error fetching dispute #${targetId}`);
      setRawDisputeData(null);
    } finally {
      setIsLoadingData(false);
    }
  };

  // --- Local Storage Inspector ---
  const refreshLocalStorage = () => {
    if (!address) return;
    const key = `slice_vote_${targetId}_${address}`;
    const data = localStorage.getItem(key);
    setLocalStorageData(data ? JSON.parse(data) : null);
  };

  // --- Manual Actions ---
  const forceJoin = async () => {
    if (!contract) return;
    try {
      toast.info("Joining...");
      const tx = await contract.joinDispute(targetId, {
        value: parseEther("0.00005"),
      });
      await tx.wait();
      toast.success("Joined successfully");
      fetchRawDispute();
    } catch (e: any) {
      toast.error(e.reason || e.message || "Failed to join");
    }
  };

  const forceCommit = async (vote: number) => {
    await commitVote(targetId, vote);
    fetchRawDispute();
  };

  const forceReveal = async () => {
    await revealVote(targetId);
    fetchRawDispute();
  };

  const forceExecute = async () => {
    if (!contract) return;
    try {
      toast.info("Executing...");
      const tx = await contract.executeRuling(targetId);
      await tx.wait();
      toast.success("Ruling Executed");
      fetchRawDispute();
    } catch (e: any) {
      toast.error(e.reason || e.message || "Failed to execute");
    }
  };

  // --- Tools Logic ---
  const handleGenerateSalt = () => {
    const newSalt = generateSalt();
    setToolSalt(newSalt.toString());
    setToolHash(""); // Reset hash when salt changes
  };

  const handleCalculateHash = () => {
    if (!toolSalt) {
      toast.error("Please enter or generate a salt first");
      return;
    }
    try {
      const saltBI = BigInt(toolSalt);
      const hash = calculateCommitment(toolVote, saltBI);
      setToolHash(hash);
    } catch (_e) {
      // Changed 'e' to '_e' to fix unused variable error
      setToolHash("Error: Invalid Salt Format");
    }
  };

  useEffect(() => {
    refreshContractInfo();
  }, [refreshContractInfo]); // Added dependency

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-manrope">
      {/* --- Header --- */}
      <div className="w-full px-5 pt-9 pb-4 flex items-center justify-between bg-white shadow-sm z-10 sticky top-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1b1c23]" />
        </button>
        <span className="font-extrabold text-lg text-[#1b1c23] flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#8c8fff]" />
          Contract Debugger
        </span>
        <button
          onClick={refreshContractInfo}
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-[#8c8fff]"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        {/* --- Global Stats Card --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Disputes
            </h3>
            <p className="text-2xl font-extrabold text-[#1b1c23]">
              {contractInfo ? contractInfo.count : "..."}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
              Network
            </h3>
            <p className="text-sm font-bold text-[#1b1c23] text-right flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Base Sepolia
            </p>
          </div>
        </div>

        {/* --- Target Selection --- */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider ml-1">
            Target Dispute
          </h3>
          <div className="bg-white p-2 rounded-[18px] border border-gray-100 shadow-sm flex items-center gap-2">
            <div className="pl-3">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              placeholder="Dispute ID"
              className="flex-1 p-3 outline-none text-[#1b1c23] font-bold bg-transparent"
            />
            <button
              onClick={fetchRawDispute}
              disabled={isLoadingData}
              className="bg-[#1b1c23] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isLoadingData ? "..." : "Fetch"}
            </button>
          </div>
        </div>

        {/* --- Raw Data Display --- */}
        {rawDisputeData && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="font-extrabold text-lg text-[#1b1c23]">
                Dispute #{rawDisputeData.id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                ${
                  rawDisputeData.statusIndex === 0
                    ? "bg-blue-50 text-blue-600"
                    : rawDisputeData.statusIndex === 1
                      ? "bg-purple-50 text-purple-600"
                      : rawDisputeData.statusIndex === 2
                        ? "bg-orange-50 text-orange-600"
                        : "bg-green-50 text-green-600"
                }`}
              >
                {rawDisputeData.status}
              </span>
            </div>

            <div className="space-y-3">
              {[
                ["Category", rawDisputeData.category],
                ["Jurors Needed", rawDisputeData.jurorsRequired],
                ["Required Stake", rawDisputeData.requiredStake],
                ["Commit Deadline", rawDisputeData.commitDeadline],
                ["Reveal Deadline", rawDisputeData.revealDeadline],
                [
                  "Winner",
                  rawDisputeData.winner !== "None"
                    ? `${rawDisputeData.winner.slice(0, 6)}...`
                    : "None",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-[#1b1c23] font-bold text-right truncate max-w-[150px]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Actions --- */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider ml-1">
            Force Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={forceJoin}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-[18px] bg-white border border-gray-100 shadow-sm hover:border-[#8c8fff] hover:bg-[#8c8fff]/5 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-[#1b1c23] text-sm">Join</span>
            </button>

            <button
              onClick={forceExecute}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-[18px] bg-white border border-gray-100 shadow-sm hover:border-[#8c8fff] hover:bg-[#8c8fff]/5 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Gavel className="w-5 h-5" />
              </div>
              <span className="font-bold text-[#1b1c23] text-sm">Execute</span>
            </button>
          </div>

          <div className="bg-white rounded-[18px] p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => forceCommit(0)}
                disabled={isProcessing}
                className="flex-1 py-3 bg-[#f5f6f9] hover:bg-gray-200 rounded-xl text-xs font-bold text-[#1b1c23] transition-colors"
              >
                Vote 0 (Def)
              </button>
              <button
                onClick={() => forceCommit(1)}
                disabled={isProcessing}
                className="flex-1 py-3 bg-[#f5f6f9] hover:bg-gray-200 rounded-xl text-xs font-bold text-[#1b1c23] transition-colors"
              >
                Vote 1 (Claim)
              </button>
            </div>

            <button
              onClick={forceReveal}
              disabled={isProcessing}
              className="w-full py-4 px-4 bg-[#1b1c23] text-white rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg hover:bg-[#2c2d33] transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {isProcessing ? "Revealing on Chain..." : "Reveal My Vote"}
            </button>

            {logs && (
              <div className="p-3 bg-gray-900 rounded-xl text-[10px] font-mono text-white mt-1 whitespace-pre-wrap border border-gray-800">
                {">"} {logs}
              </div>
            )}
          </div>
        </div>

        {/* --- Local Storage Inspector --- */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <Database className="w-3 h-3" /> Local Secrets
          </h3>

          <div className="bg-white rounded-[18px] p-5 shadow-sm border border-gray-100">
            {localStorageData ? (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-[#f5f6f9] rounded-xl">
                  <span className="text-xs font-bold text-gray-500">
                    My Vote
                  </span>
                  <span className="text-sm font-extrabold text-[#1b1c23]">
                    {localStorageData.vote}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-[#f5f6f9] rounded-xl">
                  <span className="text-xs font-bold text-gray-500">
                    Saved Salt
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 break-all select-all">
                    {localStorageData.salt}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-600 font-bold px-1">
                  <CheckCircle className="w-3 h-3" /> Data persisted
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm">
                No local secrets found for this ID + Wallet.
              </div>
            )}
          </div>
        </div>

        {/* --- Crypto Tools --- */}
        <div className="flex flex-col gap-3 pb-8">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider ml-1">
            Crypto Tools
          </h3>

          <div className="bg-white rounded-[18px] p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
            {/* Tool 1: Salt Generation */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1b1c23] uppercase flex items-center gap-1">
                <Dices className="w-3 h-3" /> Step 1: Generate Salt
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Click Generate →"
                  value={toolSalt}
                  onChange={(e) => setToolSalt(e.target.value)}
                  className="flex-1 p-3 bg-[#f5f6f9] rounded-xl text-xs font-mono outline-none focus:ring-2 focus:ring-[#8c8fff]"
                />
                <button
                  onClick={handleGenerateSalt}
                  className="bg-[#f5f6f9] px-4 rounded-xl text-xs font-bold text-[#8c8fff] hover:bg-[#8c8fff]/10 transition-colors border border-transparent hover:border-[#8c8fff]"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Tool 2: Vote Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1b1c23] uppercase flex items-center gap-1">
                <Gavel className="w-3 h-3" /> Step 2: Select Vote
              </label>
              <div className="flex gap-2 bg-[#f5f6f9] p-1 rounded-xl">
                <button
                  onClick={() => setToolVote(0)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    toolVote === 0
                      ? "bg-white text-[#1b1c23] shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  0 (Defendant)
                </button>
                <button
                  onClick={() => setToolVote(1)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    toolVote === 1
                      ? "bg-white text-[#1b1c23] shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  1 (Claimant)
                </button>
              </div>
            </div>

            {/* Tool 3: Calculate */}
            <button
              onClick={handleCalculateHash}
              className="w-full py-3 bg-[#1b1c23] text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <Hash className="w-3 h-3" />
              Step 3: Calculate Commitment
            </button>

            {/* Result */}
            {toolHash && (
              <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Resulting Hash:
                </span>
                <div className="p-3 bg-gray-900 rounded-xl text-[10px] font-mono text-white break-all border border-gray-800 select-all">
                  {toolHash}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
