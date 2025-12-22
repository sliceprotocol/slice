"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DisputeOverviewHeader } from "@/components/dispute-overview/DisputeOverviewHeader";
import { TimerCard } from "@/components/dispute-overview/TimerCard";
import { PaginationDots } from "@/components/dispute-overview/PaginationDots";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import {
  ArrowRight,
  RefreshCw,
  Eye,
  CheckCircle2,
  User,
  Shield,
  Lock,
  Scale,
  Home,
} from "lucide-react";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useVote } from "@/hooks/useVote";

export default function VotePage() {
  const router = useRouter();
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const {
    dispute,
    selectedVote,
    hasCommittedLocally,
    isRefreshing,
    isProcessing,
    isCommitDisabled,
    isRevealDisabled,
    handleVoteSelect,
    handleCommit,
    handleRefresh,
  } = useVote(disputeId);

  const handleBack = () => {
    router.back();
  };

  const { handlers } = useSwipeGesture({
    onSwipeRight: () => {
      router.push(`/defendant-evidence/${disputeId}`);
    },
  });

  const onCommitClick = async () => {
    const success = await handleCommit();
    if (success) {
      // Success handled by toast/state update
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccessAnimation(false);
    router.push("/disputes");
  };

  // Helper to map role to UI assets
  const getPartyInfo = (role: "claimer" | "defender") => {
    if (role === "claimer") {
      return {
        name: dispute?.claimer
          ? `${dispute.claimer.slice(0, 6)}...${dispute.claimer.slice(-4)}`
          : "Julio Banegas",
        roleLabel: "Claimant",
        avatarUrl: "/images/profiles-mockup/profile-1.jpg", // Consistent with other pages
        fallbackIcon: <User className="w-8 h-8 text-blue-600" />,
        themeColor: "blue",
      };
    }
    return {
      name: dispute?.defender
        ? `${dispute.defender.slice(0, 6)}...${dispute.defender.slice(-4)}`
        : "Micaela Descotte",
      roleLabel: "Defendant",
      avatarUrl: "/images/profiles-mockup/profile-2.jpg",
      fallbackIcon: <Shield className="w-8 h-8 text-gray-600" />,
      themeColor: "gray",
    };
  };

  const claimerInfo = getPartyInfo("claimer");
  const defenderInfo = getPartyInfo("defender");

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC]" {...handlers}>
      {/* 1. Fixed Header */}
      <div className="flex-none z-10 bg-[#F8F9FC]/80 backdrop-blur-md">
        <DisputeOverviewHeader onBack={handleBack} />
        <TimerCard />
      </div>

      {/* 2. Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 pt-2 scrollbar-hide">
        <div className="flex flex-col gap-6 max-w-sm mx-auto h-full">
          {/* Page Title */}
          <div className="flex justify-between items-end px-1 mt-2">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1b1c23] leading-tight">
                Make your
                <br />
                Ruling
              </h2>
              <p className="text-xs font-bold text-gray-400 mt-1">
                Review the evidence and select a winner.
              </p>
            </div>
            <button
              onClick={() => void handleRefresh()}
              disabled={isRefreshing || isProcessing}
              className="p-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-[#8c8fff] active:scale-90 transition-transform hover:bg-gray-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {/* VOTING CARDS AREA */}
          <div className="flex flex-col gap-5 relative flex-1 min-h-[320px]">
            {/* WRAPPER: Make the first card relative so we can anchor the badge to it */}
            <div className="relative z-10">
              {/* CLAIMANT CARD */}
              <VoteOptionCard
                isSelected={selectedVote === 1}
                isCommitted={hasCommittedLocally}
                onClick={() => handleVoteSelect(1)}
                info={claimerInfo}
              />

              {/* VS BADGE (Anchored to bottom of this card) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 -translate-y-1/2 z-20 pointer-events-none">
                <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-[9px] font-black text-gray-200">
                      VS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DEFENDANT CARD */}
            <VoteOptionCard
              isSelected={selectedVote === 0}
              isCommitted={hasCommittedLocally}
              onClick={() => handleVoteSelect(0)}
              info={defenderInfo}
            />
          </div>

          {/* STATUS NOTIFICATIONS */}

          {/* Processing */}
          {isProcessing && (
            <div className="mx-auto flex items-center gap-2 text-[10px] font-bold text-[#8c8fff] animate-pulse bg-white px-4 py-2 rounded-full shadow-sm border border-[#8c8fff]/20">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>SECURING VOTE ON-CHAIN...</span>
            </div>
          )}

          {/* Vote Locked (Committed) */}
          {hasCommittedLocally && (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 mx-auto w-full">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#1b1c23]">
                  Vote Secured
                </h4>
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  Your decision is encrypted. You must reveal it in the next
                  phase.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white/95 to-transparent z-20 flex justify-center pb-8">
        <div className="w-full max-w-sm flex flex-col gap-4">
          {/* Pagination */}
          <div className="mb-2">
            <PaginationDots currentIndex={3} total={4} />
          </div>

          {/* Main Action Button */}
          {!hasCommittedLocally ? (
            <button
              className={`
                w-full py-4 px-6 rounded-2xl font-manrope font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(27,28,35,0.2)]
                flex items-center justify-center gap-2
                ${
                  isCommitDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-[#1b1c23] text-white hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
              onClick={() => void onCommitClick()}
              disabled={isCommitDisabled}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>COMMITTING...</span>
                </>
              ) : (
                <>
                  <Scale className="w-4 h-4" />
                  <span>COMMIT VOTE</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                if (isRevealDisabled) {
                  router.push("/disputes");
                } else {
                  router.push(`/reveal/${disputeId}`);
                }
              }}
              // Removed disabled prop so user can always click to go home if reveal is disabled
              className={`
                        w-full py-4 px-6 rounded-2xl font-manrope font-semibold tracking-wide transition-all duration-300
                        flex items-center justify-center gap-2
                        ${
                          isRevealDisabled
                            ? "bg-white text-[#1b1c23] border border-gray-200 shadow-sm hover:bg-gray-50" // Secondary style
                            : "bg-[#1b1c23] text-white shadow-[0_8px_20px_-6px_rgba(27,28,35,0.2)] hover:scale-[1.02] active:scale-[0.98]" // Primary style
                        }
                        `}
            >
              {isRevealDisabled ? (
                <>
                  <Home className="w-4 h-4" />
                  <span>RETURN HOME</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>GO TO REVEAL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {showSuccessAnimation && (
        <SuccessAnimation onComplete={handleAnimationComplete} />
      )}
    </div>
  );
}

// --- MODERN CARD COMPONENT ---

interface VoteOptionCardProps {
  isSelected: boolean;
  isCommitted: boolean;
  onClick: () => void;
  info: {
    name: string;
    roleLabel: string;
    avatarUrl: string;
    fallbackIcon: React.ReactNode;
    themeColor: string;
  };
}

function VoteOptionCard({
  isSelected,
  isCommitted,
  onClick,
  info,
}: VoteOptionCardProps) {
  // Dynamic Styles
  const containerStyle = isSelected
    ? `border-gray-800 bg-white ring-2 ring-gray-800 shadow-lg scale-[1.02] z-10`
    : "border-transparent bg-white shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-md border border-gray-100";

  const disabledStyle =
    isCommitted && !isSelected
      ? "opacity-40 grayscale pointer-events-none"
      : "";

  return (
    <button
      onClick={onClick}
      disabled={isCommitted}
      className={`
        relative w-full rounded-[24px] p-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group
        flex items-center gap-4 h-[100px]
        ${containerStyle}
        ${disabledStyle}
      `}
    >
      {/* 1. Avatar Section */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
          <img
            src={info.avatarUrl}
            alt={info.roleLabel}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div className="hidden w-full h-full flex items-center justify-center bg-gray-50">
            {info.fallbackIcon}
          </div>
        </div>
        {/* Role Badge (Small pill) */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-white shadow-sm whitespace-nowrap bg-${info.themeColor}-50 text-${info.themeColor}-600`}
        >
          {info.roleLabel}
        </div>
      </div>

      {/* 2. Text Content */}
      <div className="flex-1 text-left">
        <span
          className={`block text-[10px] font-bold uppercase tracking-widest mb-0.5 transition-colors ${isSelected ? "text-[#1b1c23]" : "text-gray-400"}`}
        >
          Vote For
        </span>
        <h3
          className={`text-lg font-extrabold leading-tight transition-colors ${isSelected ? "text-[#1b1c23]" : "text-gray-700"}`}
        >
          {info.name}
        </h3>
      </div>

      {/* 3. Selection Indicator (Checkmark) */}
      <div
        className={`
        w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
        ${
          isSelected
            ? "bg-[#1b1c23] border-[#1b1c23] scale-100 opacity-100 shadow-md"
            : "border-gray-100 bg-transparent scale-90 opacity-0"
        }
      `}
      >
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>

      {/* Subtle BG Flash on Selection */}
      {isSelected && (
        <div className="absolute inset-0 bg-[#1b1c23]/[0.02] pointer-events-none rounded-[24px]" />
      )}
    </button>
  );
}
