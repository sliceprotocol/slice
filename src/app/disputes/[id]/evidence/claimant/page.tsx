"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EvidenceView } from "@/components/dispute-overview/EvidenceView";

export default function ClaimantEvidencePage() {
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  return (
    <EvidenceView
      disputeId={disputeId}
      role="claimant"
      prevPath={`/disputes/${disputeId}`}
      nextPath={`/disputes/${disputeId}/evidence/defendant`}
      pageIndex={1}
    />
  );
}
