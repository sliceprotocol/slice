import { useState } from "react";

export function useCreateDispute() {
  const [isCreating, setIsCreating] = useState(false);

  const createDispute = async () => {
    setIsCreating(true);
    console.log("TODO: Implement EVM createDispute");

    await new Promise((r) => setTimeout(r, 1000));
    setIsCreating(false);

    return "100"; // Return a dummy Dispute ID
  };

  return { createDispute, isCreating };
}
