"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Gavel, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ONBOARDING_KEY = "slice_onboarding_juror_v1";
const OPEN_EVENT = "open-juror-onboarding";

type Slide = {
  title: string;
  body: string;
  primaryLabel?: string;
  secondary?: {
    label: string;
    href: string;
  };
};

const SLIDES: Slide[] = [
  {
    title: "Welcome to Slice",
    body: "Slice is a dispute-resolution protocol where jurors get paid to vote fairly. You'll go from: Start Voting -> Review -> Commit -> Reveal -> Earn.",
    primaryLabel: "Continue",
  },
  {
    title: "What You'll Do as a Juror",
    body: "You review the dispute details and evidence from both sides. You vote independently; your goal is an honest, unbiased ruling.",
  },
  {
    title: "Start Voting",
    body: "From the main page, tap Start Voting to enter the juror flow. If a dispute is available for you, you'll be taken straight to it.",
    secondary: {
      label: "Start Voting",
      href: "/juror/stake",
    },
  },
  {
    title: "Review the Case",
    body: "Read the claim, the response, and the evidence submitted. Look for concrete proof, timelines, and consistency.",
  },
  {
    title: "Commit Your Vote (Private Step)",
    body: "First you submit a commitment to your vote. This keeps voting fair by preventing early influence.",
  },
  {
    title: "Reveal + Earn",
    body: "Later you reveal your vote to finalize it. Track your activity and outcomes in My Votes.",
  },
];

function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(ONBOARDING_KEY) === "seen";
}

function markOnboardingSeen(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARDING_KEY, "seen");
}

export function JurorOnboardingGate() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [ready, setReady] = React.useState(false);

  const slide = SLIDES[step];
  const isFirst = step === 0;
  const isLast = step === SLIDES.length - 1;

  const openToStart = React.useCallback(() => {
    setStep(0);
    setOpen(true);
  }, []);

  React.useEffect(() => {
    setReady(true);
  }, []);

  // Auto-open on first visit to main landing surfaces.
  React.useEffect(() => {
    if (!ready) return;
    if (hasSeenOnboarding()) return;

    const isLanding = pathname === "/" || pathname === "/disputes";
    if (!isLanding) return;

    openToStart();
  }, [pathname, ready, openToStart]);

  // Allow opening from anywhere (Profile -> Settings).
  React.useEffect(() => {
    if (!ready) return;

    const handler = () => openToStart();
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [ready, openToStart]);

  const handleSkip = () => {
    markOnboardingSeen();
    setOpen(false);
  };

  const handlePrimary = () => {
    if (isLast) {
      markOnboardingSeen();
      setOpen(false);
      return;
    }
    setStep((s) => Math.min(s + 1, SLIDES.length - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSecondary = () => {
    if (!slide?.secondary) return;
    markOnboardingSeen();
    setOpen(false);
    router.push(slide.secondary.href);
  };

  // Don't render until client hydration so localStorage checks are safe.
  if (!ready) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",
            "rounded-[28px] bg-white shadow-2xl border border-gray-100",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "outline-none",
          )}
        >
          <div className="relative p-6">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[#8c8fff]/15 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-[#1b1c23] text-white flex items-center justify-center shadow-sm">
                  <Gavel className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Juror Onboarding
                  </div>
                  <div className="text-xs font-bold text-gray-500">
                    {step + 1} / {SLIDES.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip
                </button>
                <DialogPrimitive.Close asChild>
                  <button
                    type="button"
                    className="h-9 w-9 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors"
                    aria-label="Close"
                    onClick={() => {
                      // Close is allowed without marking seen when opened via Settings,
                      // but on first-run we still want Skip/Finish to be explicit.
                      setOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </DialogPrimitive.Close>
              </div>
            </div>

            <div className="relative mt-6">
              <DialogPrimitive.Title className="font-manrope font-extrabold text-[22px] leading-tight text-[#1b1c23] tracking-tight">
                {slide.title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-base font-medium text-gray-600 leading-relaxed">
                {slide.body}
              </DialogPrimitive.Description>
            </div>

            <div className="relative mt-6 flex items-center justify-center gap-1.5">
              {SLIDES.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === step ? "bg-[#8c8fff]" : "bg-gray-200",
                  )}
                />
              ))}
            </div>

            <div className="relative mt-6 flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isFirst}
                className="h-11 flex-1 rounded-2xl border-gray-200 bg-white text-[#1b1c23] disabled:opacity-40"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handlePrimary}
                className="h-11 flex-1 rounded-2xl bg-[#1b1c23] text-white hover:bg-[#2c2d33]"
              >
                {isLast ? "Finish" : slide.primaryLabel || "Next"}
                {!isLast && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {slide.secondary && (
              <button
                type="button"
                onClick={handleSecondary}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl border border-[#8c8fff]/40 bg-[#8c8fff]/10 py-3 text-sm font-extrabold text-[#1b1c23] hover:bg-[#8c8fff]/15 transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-[#8c8fff]" />
                {slide.secondary.label}
              </button>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
