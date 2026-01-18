"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  UploadCloud,
  User,
  Gavel,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import { useCreateDispute } from "@/hooks/useCreateDispute";
import { uploadFileToIPFS } from "@/util/ipfs";
import { Button } from "@/components/ui/button";

// Import Modular Components
import {
  WizardProgress,
  StepBasics,
  StepParties,
  StepEvidence,
  StepReview,
} from "@/components/create";
import type {
  CreateDisputeForm,
  FileState,
  StepDefinition,
} from "@/components/create";

// --- STEPS DEFINITION ---
const STEPS: StepDefinition[] = [
  { id: 1, title: "Protocol Settings", icon: <Gavel className="w-4 h-4" /> },
  { id: 2, title: "The Parties", icon: <User className="w-4 h-4" /> },
  { id: 3, title: "Evidence", icon: <UploadCloud className="w-4 h-4" /> },
  { id: 4, title: "Review", icon: <ShieldAlert className="w-4 h-4" /> },
];

export default function CreateDisputePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { createDispute, isCreating } = useCreateDispute();

  // --- WIZARD STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [showDefenderOptions, setShowDefenderOptions] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState<CreateDisputeForm>({
    title: "",
    category: "General",
    jurorsRequired: 3,
    deadlineHours: 96,
    claimerName: "",
    claimerAddress: "",
    defenderName: "",
    defenderAddress: "",
    description: "",
    evidenceLink: "",
    defDescription: "",
  });

  // --- FILE STATE ---
  const [files, setFiles] = useState<FileState>({
    audio: null,
    carousel: [],
    defAudio: null,
    defCarousel: [],
  });

  // --- HANDLERS ---
  const updateField = (
    field: keyof CreateDisputeForm,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Basic Validation per step
    if (currentStep === 1 && !formData.title)
      return toast.error("Title is required");
    if (currentStep === 2 && !formData.defenderAddress)
      return toast.error("Defender address is required");
    if (currentStep === 3 && !formData.description)
      return toast.error("Description is required");

    if (currentStep < 4) setCurrentStep((c) => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((c) => c - 1);
    else router.back();
  };

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async () => {
    if (formData.jurorsRequired % 2 === 0) {
      toast.error("Please select an odd number of jurors.");
      return;
    }

    try {
      setIsUploading(true);

      // 1. Upload Claimant Assets
      let audioUrl = "";
      if (files.audio) {
        toast.info("Uploading claimant audio...");
        const hash = await uploadFileToIPFS(files.audio);
        if (hash) audioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
      }

      let carouselUrls: string[] = [];
      if (files.carousel.length > 0) {
        toast.info("Uploading claimant photos...");
        const uploadPromises = files.carousel.map((f) => uploadFileToIPFS(f));
        const hashes = await Promise.all(uploadPromises);
        carouselUrls = hashes
          .filter((h) => h)
          .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
      }

      // 2. Upload Defender Assets
      let defAudioUrl: string | null = null;
      if (files.defAudio) {
        const hash = await uploadFileToIPFS(files.defAudio);
        if (hash) defAudioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
      }

      let defCarouselUrls: string[] = [];
      if (files.defCarousel.length > 0) {
        const hashes = await Promise.all(
          files.defCarousel.map((f) => uploadFileToIPFS(f)),
        );
        defCarouselUrls = hashes
          .filter((h) => h)
          .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
      }

      // 3. Construct Payload
      const disputePayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        evidence: formData.evidenceLink ? [formData.evidenceLink] : [],
        aliases: {
          claimer: formData.claimerName || "Anonymous Claimant",
          defender: formData.defenderName || "Anonymous Defendant",
        },
        audioEvidence: audioUrl || null,
        carouselEvidence: carouselUrls,
        defenderDescription: formData.defDescription || null,
        defenderAudioEvidence: defAudioUrl,
        defenderCarouselEvidence: defCarouselUrls,
        created_at: new Date().toISOString(),
      };

      const success = await createDispute(
        formData.defenderAddress,
        formData.claimerAddress || undefined,
        formData.category,
        disputePayload,
        formData.jurorsRequired,
        formData.deadlineHours,
      );

      if (success) {
        await queryClient.invalidateQueries({ queryKey: ["disputeCount"] });
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload evidence.");
    } finally {
      setIsUploading(false);
    }
  };

  const isProcessing = isCreating || isUploading;

  // --- RENDER CURRENT STEP ---
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasics data={formData} updateField={updateField} />;
      case 2:
        return <StepParties data={formData} updateField={updateField} />;
      case 3:
        return (
          <StepEvidence
            data={formData}
            updateField={updateField}
            files={files}
            setFiles={setFiles}
          />
        );
      case 4:
        return (
          <StepReview
            data={formData}
            updateField={updateField}
            files={files}
            setFiles={setFiles}
            showDefenderOptions={showDefenderOptions}
            setShowDefenderOptions={setShowDefenderOptions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] overflow-hidden relative">
      {/* --- HEADER --- */}
      <div className="pt-8 px-6 pb-4 bg-white shadow-sm z-20 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={isProcessing}
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-[#1b1c23]" />
        </button>
        {/* Progress Dots */}
        <WizardProgress currentStep={currentStep} totalSteps={STEPS.length} />
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-extrabold text-[#1b1c23] tracking-tight">
            {STEPS[currentStep - 1].title}
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Step {currentStep} of {STEPS.length}
          </p>
        </div>

        {renderStep()}
      </div>

      {/* --- FLOATING FOOTER --- */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-30">
        <Button
          onClick={currentStep === 4 ? handleSubmit : handleNext}
          disabled={isProcessing}
          className={`
            w-full py-6 rounded-2xl font-manrope font-bold text-base shadow-xl
            flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]
            ${isProcessing ? "bg-gray-200 text-gray-400" : "bg-[#1b1c23] text-white"}
          `}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : currentStep === 4 ? (
            <>
              Create Dispute <CheckCircle2 className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
