import React from "react";
import { ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";


import {StepReviewProps} from "@/components/create/index";

export const StepReview: React.FC<StepReviewProps> = ({
  data,
  updateField,
  files,
  setFiles,
  showDefenderOptions,
  setShowDefenderOptions,
}) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-[#F8F9FC] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8 text-[#1b1c23]" />
        </div>
        <h2 className="text-xl font-black text-[#1b1c23] mb-1">
          Ready to Mint?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Creating this dispute will initialize the case on-chain.
        </p>

        <div className="bg-[#F8F9FC] rounded-xl p-4 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Title</span>
            <span className="font-bold text-[#1b1c23]">{data.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category</span>
            <span className="font-bold text-[#1b1c23]">{data.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Opponent</span>
            <span className="font-bold text-[#1b1c23]">
              {data.defenderAddress.slice(0, 6)}...
              {data.defenderAddress.slice(-4)}
            </span>
          </div>
        </div>
      </div>

      {/* Collapsible Advanced Options */}
      <div className="border border-dashed border-gray-200 rounded-2xl p-4">
        <button
          onClick={() => setShowDefenderOptions(!showDefenderOptions)}
          className="w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wide"
        >
          <span>Advanced: Pre-load Defender Evidence</span>
          {showDefenderOptions ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showDefenderOptions && (
          <div className="mt-4 space-y-3 pt-3 border-t border-gray-100">
            <textarea
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none"
              placeholder="Counter-statement..."
              value={data.defDescription}
              onChange={(e) => updateField("defDescription", e.target.value)}
            />
            <div className="flex gap-2">
              <label className="flex-1 bg-white border border-gray-200 py-2 text-center rounded-lg text-xs cursor-pointer hover:bg-gray-50">
                {files.defAudio ? files.defAudio.name : "Def. Voice"}
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files &&
                    setFiles((prev) => ({
                      ...prev,
                      defAudio: e.target.files![0],
                    }))
                  }
                />
              </label>
              <label className="flex-1 bg-white border border-gray-200 py-2 text-center rounded-lg text-xs cursor-pointer hover:bg-gray-50">
                {files.defCarousel.length > 0
                  ? `${files.defCarousel.length} images`
                  : "Def. Images"}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files &&
                    setFiles((prev) => ({
                      ...prev,
                      defCarousel: Array.from(e.target.files!),
                    }))
                  }
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
