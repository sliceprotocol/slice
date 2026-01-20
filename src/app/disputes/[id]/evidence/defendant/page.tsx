"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EvidenceView } from "@/components/dispute-overview/EvidenceView";

export default function DefendantEvidencePage() {
  const params = useParams();
  const disputeId = (params?.id as string) || "1";

  return (
    <EvidenceView
      disputeId={disputeId}
      role="defendant"
      prevPath={`/disputes/${disputeId}/evidence/claimant`}
      nextPath={`/disputes/${disputeId}/vote`}
      pageIndex={2}
    />
  );
}
