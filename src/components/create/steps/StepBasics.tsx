import React, { useState } from "react";
import { Users, ChevronDown, ChevronUp, Clock } from "lucide-react";

import type { StepProps } from "../types";

type TimeUnit = "days" | "hours";

export const StepBasics: React.FC<StepProps> = ({ data, updateField }) => {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("days");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Convert hours to display value based on unit
  const getDisplayValue = () => {
    if (timeUnit === "days") {
      return Math.floor(data.deadlineHours / 24);
    }
    return data.deadlineHours;
  };

  // Update hours when slider changes
  const handleTimeChange = (value: number) => {
    if (timeUnit === "days") {
      updateField("deadlineHours", value * 24);
    } else {
      updateField("deadlineHours", value);
    }
  };

  // When switching units, adjust the value to stay within bounds
  const handleUnitChange = (newUnit: TimeUnit) => {
    setTimeUnit(newUnit);
    if (newUnit === "days") {
      // Round to nearest day, ensure at least 1 day
      const days = Math.max(1, Math.round(data.deadlineHours / 24));
      updateField("deadlineHours", Math.min(days * 24, 168));
    }
  };

  const sliderMin = timeUnit === "days" ? 1 : 1;
  const sliderMax = timeUnit === "days" ? 7 : 24;
  const sliderStep = timeUnit === "days" ? 1 : 1;

  // Calculate phase durations for display (in hours)
  const totalHours = data.deadlineHours;
  const payHours = Math.max(1, Math.round(totalHours * 0.1));
  const remainingHours = totalHours - payHours;
  const evidenceHours = Math.round(remainingHours * 0.45);
  const votingHours = Math.round(remainingHours * 0.55);

  // Format hours to days/hours string
  const formatDuration = (hours: number) => {
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHrs = hours % 24;
      if (remainingHrs === 0) {
        return `${days} day${days > 1 ? "s" : ""}`;
      }
      return `${days}d ${remainingHrs}h`;
    }
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  };
  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide">
          Dispute Title
        </label>
        <input
          type="text"
          className="p-4 bg-white rounded-2xl text-base font-semibold border border-gray-100 focus:ring-2 focus:ring-[#8c8fff] outline-none shadow-sm"
          placeholder="e.g. Unpaid Freelance Invoice"
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide">
          Category
        </label>
        <div className="relative">
          <select
            className="w-full p-4 bg-white rounded-2xl text-base font-semibold border border-gray-100 focus:ring-2 focus:ring-[#8c8fff] outline-none shadow-sm appearance-none"
            value={data.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            <option value="General">General Court</option>
            <option value="Tech">Tech & Software</option>
            <option value="Freelance">Freelance & Services</option>
            <option value="E-Commerce">E-Commerce</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide flex justify-between">
          <span>Jurors Needed</span>
          <span className="text-[#8c8fff]">{data.jurorsRequired}</span>
        </label>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <Users className="text-gray-400 w-5 h-5" />
          <input
            type="range"
            min="1"
            max="9"
            step="2"
            value={data.jurorsRequired}
            onChange={(e) =>
              updateField("jurorsRequired", Number(e.target.value))
            }
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1b1c23]"
          />
        </div>
        <p className="text-[10px] text-gray-400 font-medium ml-1">
          Must be an odd number (3, 5, 7...).
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xs text-gray-500 uppercase tracking-wide flex justify-between">
          <span>Total Deadline</span>
          <span className="text-[#8c8fff]">
            {formatDuration(data.deadlineHours)}
          </span>
        </label>

        {/* Unit Toggle */}
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => handleUnitChange("days")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              timeUnit === "days"
                ? "bg-[#1b1c23] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Days
          </button>
          <button
            type="button"
            onClick={() => handleUnitChange("hours")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              timeUnit === "hours"
                ? "bg-[#1b1c23] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Hours
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <Clock className="text-gray-400 w-5 h-5" />
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            value={getDisplayValue()}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1b1c23]"
          />
          <span className="text-sm font-semibold text-gray-600 min-w-[3rem] text-right">
            {getDisplayValue()} {timeUnit === "days" ? "d" : "h"}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 font-medium ml-1">
          {timeUnit === "days"
            ? "Maximum: 7 days"
            : "Maximum: 24 hours (use Days for longer)"}
        </p>
      </div>

      {/* Process Breakdown Accordion */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsTimelineOpen(!isTimelineOpen)}
          className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <p className="font-bold text-xs text-gray-600 uppercase tracking-wide">
            Process Timeline ({formatDuration(data.deadlineHours)})
          </p>
          {isTimelineOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        {isTimelineOpen && (
          <div className="p-4 pt-0 bg-white flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex justify-between items-center">
              <span>💰 Payment Window</span>
              <span className="font-semibold text-[#8c8fff]">
                {formatDuration(payHours)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>📄 Evidence Submission</span>
              <span className="font-semibold text-[#8c8fff]">
                {formatDuration(evidenceHours)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>🗳️ Juror Voting</span>
              <span className="font-semibold text-[#8c8fff]">
                {formatDuration(votingHours)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
