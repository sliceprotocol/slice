"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";

export default function DisputesPage() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  redirect("/disputes");
  return <div></div>;
}
