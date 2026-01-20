import { useState } from "react";

import {CreateDisputeForm} from "@/components/create";

type TimeUnit = "days" | "hours";

interface UseStepBasicsProps {
    data: CreateDisputeForm;
    updateField: (field: keyof CreateDisputeForm, value: string | number) => void;
}

export const useStepBasics = ({ data, updateField }: UseStepBasicsProps) => {
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

    return {
        timeUnit,
        isTimelineOpen,
        setIsTimelineOpen,
        getDisplayValue,
        handleTimeChange,
        handleUnitChange,
        sliderMin,
        sliderMax,
        sliderStep,
        payHours,
        evidenceHours,
        votingHours,
        formatDuration,
    };
};
