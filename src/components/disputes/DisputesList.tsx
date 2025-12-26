"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDisputeList } from "@/hooks/useDisputeList";
import { DisputeListView } from "./DisputeListView";

export const DisputesList: React.FC = () => {
  const router = useRouter();
  const { disputes, isLoading } = useDisputeList("all");

  return (
    <DisputeListView
      disputes={disputes}
      isLoading={isLoading}
      onEarnClick={() => router.push("/category-amount")}
    />
  );
};
