import React from "react";

import { SelectParty } from "./SelectParty";
import {StepProps} from "@/components/create/index";

export const StepParties: React.FC<StepProps> = ({ data, updateField }) => {
  // Wrapper to handle the dual update (Name AND Address)
  const handleClaimerChange = (name: string, address: string) => {
    updateField("claimerName", name);
    updateField("claimerAddress", address);
  };

  const handleDefenderChange = (name: string, address: string) => {
    updateField("defenderName", name);
    updateField("defenderAddress", address);
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-2xl font-extrabold text-[#1b1c23]">
          Who is involved?
        </h2>
        <p className="text-sm text-gray-400">
          Identify the parties in this dispute.
        </p>
      </div>

      {/* Claimer Selector */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
            A
          </span>
          <h3 className="text-sm font-extrabold text-[#1b1c23]">
            Claimant (You)
          </h3>
        </div>

        <SelectParty
          label="Select Identity"
          valueName={data.claimerName}
          valueAddress={data.claimerAddress}
          onChange={handleClaimerChange}
        />
      </div>

      {/* Defender Selector */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
            B
          </span>
          <h3 className="text-sm font-extrabold text-[#1b1c23]">Defendant</h3>
        </div>

        <SelectParty
          label="Select Identity"
          valueName={data.defenderName}
          valueAddress={data.defenderAddress}
          onChange={handleDefenderChange}
        />
      </div>
    </div>
  );
};
