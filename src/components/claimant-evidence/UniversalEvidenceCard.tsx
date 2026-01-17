import React, { useState } from "react";
import { Calendar, Maximize2, Mic, PlayCircle } from "lucide-react";

export type EvidenceType = "audio" | "video" | "image";

export interface UniversalEvidence {
  id: string;
  type: EvidenceType;
  title?: string; // For audio
  description?: string; // For video/image
  url: string;
  thumbnail?: string; // For video
  duration?: string; // For audio "0:45"
  uploadDate?: string; // For video/image "Dec 12, 2023"
  progress?: number; // For audio (optional)
}

interface UniversalEvidenceCardProps {
  evidence: UniversalEvidence;
}

export const UniversalEvidenceCard: React.FC<UniversalEvidenceCardProps> = ({
  evidence,
}) => {
  const [progress] = useState(evidence.progress || 0);

  const handleClick = () => {
    if (evidence.url) {
      window.open(evidence.url, "_blank");
    }
  };

  // --- RENDER: AUDIO CARD (Compact Row) ---
  if (evidence.type === "audio") {
    return (
      <div
        onClick={handleClick}
        className="bg-[rgba(140,143,255,0.1)] rounded-[16px] p-4 mx-[19px] flex items-center gap-4 box-border cursor-pointer hover:bg-[rgba(140,143,255,0.2)] transition-colors"
      >
        <div className="shrink-0">
          <Mic className="w-[35px] h-[35px] text-[#1b1c23]" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="font-manrope font-extrabold text-[10px] text-[#1b1c23] tracking-[-0.2px] leading-none">
            {evidence.title || "Audio Recording"}
          </div>
          <div className="w-full">
            <div className="relative w-full h-[3px] bg-[#d6d8ee] rounded-[1.5px] overflow-visible">
              <div
                className="absolute top-0 left-0 h-full bg-[#8c8fff] rounded-[1.5px] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[9px] h-[9px] bg-[#1b1c23] rounded-full z-10"
                style={{ left: `calc(${progress}% - 4.5px)` }}
              />
            </div>
          </div>
          <div className="font-manrope font-extrabold text-[10px] text-[#1b1c23] tracking-[-0.2px] text-right leading-none">
            {evidence.duration}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: VISUAL CARD (Video / Image) ---
  return (
    <div className="bg-white rounded-[18px] p-0 w-[280px] shrink-0 flex flex-col overflow-hidden box-border border border-gray-100 shadow-sm">
      <div className="relative w-full h-[200px] overflow-hidden bg-[#f5f6f9] flex items-center justify-center group">
        {/* Thumbnail / Image */}
        {evidence.type === "video" && !evidence.thumbnail ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <PlayCircle className="w-10 h-10 text-gray-400" />
          </div>
        ) : (
          <img
            src={evidence.thumbnail || evidence.url}
            alt={evidence.description || "Evidence"}
            className="w-full h-full object-cover block"
          />
        )}

        {/* Play Icon Overlay (Video only) */}
        {evidence.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
              <PlayCircle className="w-8 h-8 text-[#1b1c23] fill-white" />
            </div>
          </div>
        )}

        {/* Fullscreen Button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 border-none rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-white p-0 z-[2] shadow-sm opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <Maximize2 className="w-4 h-4 text-[#1b1c23]" />
        </button>
      </div>

      {/* Description */}
      <p className="font-manrope font-normal text-xs text-[#31353b] tracking-[-0.24px] leading-[1.5] m-3 mx-4 line-clamp-3 h-[4.5em] overflow-hidden">
        {evidence.description || "No description provided."}
      </p>

      {/* Footer Date */}
      <div className="flex items-center gap-1.5 bg-[#f5f6f9] px-4 py-2 font-manrope font-semibold text-[10px] text-[#31353b] tracking-[-0.2px] mt-auto">
        <Calendar className="w-2.5 h-2.5 text-[#31353b]" />
        <span>
          {evidence.type === "video" ? "Video recorded" : "Photo taken"}:{" "}
          {evidence.uploadDate}
        </span>
      </div>
    </div>
  );
};
