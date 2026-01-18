import React from "react";
import { UploadCloud } from "lucide-react";


import {StepWithFilesProps} from "@/components/create/index";

export const StepEvidence: React.FC<StepWithFilesProps> = ({
  data,
  updateField,
  files,
  setFiles,
}) => {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide">
          The Story
        </label>
        <textarea
          className="w-full p-4 bg-white rounded-2xl text-sm border border-gray-100 focus:ring-2 focus:ring-[#8c8fff] outline-none min-h-[150px] resize-none shadow-sm leading-relaxed"
          placeholder="Describe what happened in detail..."
          value={data.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide">
          Supporting Files
        </label>

        {/* Audio Upload */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1b1c23]">
              Voice Statement
            </span>
            <span className="text-xs text-gray-400">
              {files.audio ? files.audio.name : "Optional audio recording"}
            </span>
          </div>
          <label className="bg-[#F8F9FC] text-[#1b1c23] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-200 transition-colors">
            Upload
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) =>
                e.target.files &&
                setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
              }
            />
          </label>
        </div>

        {/* Images Upload */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1b1c23]">
              Images / Screenshots
            </span>
            <span className="text-xs text-gray-400">
              {files.carousel.length > 0
                ? `${files.carousel.length} files selected`
                : "Optional evidence"}
            </span>
          </div>
          <label className="bg-[#F8F9FC] text-[#1b1c23] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-200 transition-colors">
            Upload
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files &&
                setFiles((prev) => ({
                  ...prev,
                  carousel: Array.from(e.target.files!),
                }))
              }
            />
          </label>
        </div>

        {/* External Link */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-gray-400" />
          <input
            className="flex-1 text-sm outline-none"
            placeholder="External link (Drive, Doc, etc.)"
            value={data.evidenceLink}
            onChange={(e) => updateField("evidenceLink", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
