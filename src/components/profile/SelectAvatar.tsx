"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarSelectorProps {
  currentAvatar: string;
  options: string[];
  onSelect: (url: string) => void;
}

export const SelectAvatar = ({ currentAvatar, options, onSelect }: AvatarSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-2">
      {options.map((url, idx) => {
        const isSelected = currentAvatar === url;

        return (
          <button
            key={idx}
            onClick={() => onSelect(url)}
            className={cn(
              "relative group rounded-full overflow-hidden aspect-square border-2 transition-all",
              isSelected
                ? "border-[#8c8fff] scale-95 shadow-inner"
                : "border-transparent hover:border-gray-200"
            )}
          >
            <img
              src={url}
              alt={`Avatar option ${idx + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />

            {/* Selection Indicator */}
            {isSelected && (
              <div className="absolute inset-0 bg-[#1b1c23]/40 flex items-center justify-center animate-in fade-in duration-200">
                <Check className="w-6 h-6 text-white stroke-[3]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
