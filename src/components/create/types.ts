// --- SHARED TYPES FOR CREATE DISPUTE WIZARD ---

import type { Dispatch, SetStateAction } from "react";

// Define the shape of our form data for type safety
export interface CreateDisputeForm {
  title: string;
  category: string;
  jurorsRequired: number;
  deadlineHours: number;
  claimerName: string;
  claimerAddress: string;
  defenderName: string;
  defenderAddress: string;
  description: string;
  evidenceLink: string;
  defDescription: string;
}

// File state for evidence uploads
export interface FileState {
  audio: File | null;
  carousel: File[];
  defAudio: File | null;
  defCarousel: File[];
}

// Step definition
export interface StepDefinition {
  id: number;
  title: string;
  icon: React.ReactNode;
}

// Common props for step components
export interface StepProps {
  data: CreateDisputeForm;
  updateField: (field: keyof CreateDisputeForm, value: string | number) => void;
}

// Props for steps that handle file uploads
export interface StepWithFilesProps extends StepProps {
  files: FileState;
  setFiles: Dispatch<SetStateAction<FileState>>;
}

// Props for the review step (needs defender options toggle)
export interface StepReviewProps extends StepWithFilesProps {
  showDefenderOptions: boolean;
  setShowDefenderOptions: Dispatch<SetStateAction<boolean>>;
}
