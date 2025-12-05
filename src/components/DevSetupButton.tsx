// src/components/DevSetupButton.tsx
import React from "react";
import { useDevSetup } from "../hooks/useDevSetup";
import { Box } from "./layout/Box";

export const DevSetupButton: React.FC = () => {
  const { setupDemoDispute, isLoading, status } = useDevSetup();

  return (
    <Box gap="xs" direction="column" align="center">
      <button
        className="btn btn-secondary"
        onClick={() => void setupDemoDispute()}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "⚡ Initialize Demo Dispute"}
      </button>
      {status && (
        <span style={{ fontSize: "0.75rem", color: "#8c8fff" }}>
          {status}
        </span>
      )}
    </Box>
  );
};
