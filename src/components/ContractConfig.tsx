import { useState, useEffect } from "react";
import { Box } from "./layout/Box";
import storage from "../util/storage";

const DEFAULT_CONTRACT_ID =
  "CBXWA6DTDZTSOQ4LSUDW4XFUJSZK5MA5T5HEI5GD5ZJGW2OBEHTS4J4W";

const getContractId = (): string => {
  const stored = storage.getItem("contractId", "safe");
  return stored || DEFAULT_CONTRACT_ID;
};

export const ContractConfig = () => {
  const [contractId, setContractId] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    // Load current contract ID on mount
    const currentId = getContractId();
    setContractId(currentId);
  }, []);

  const handleUpdate = () => {
    if (!contractId.trim()) {
      setMessage({ type: "error", text: "Contract ID cannot be empty" });
      return;
    }

    // Basic validation: Stellar contract IDs are 56 characters
    if (contractId.length !== 56) {
      setMessage({
        type: "error",
        text: "Invalid contract ID format (must be 56 characters)",
      });
      return;
    }

    setIsUpdating(true);
    setMessage(null);

    try {
      // Store the contract ID
      storage.setItem("contractId", contractId);
      // Note: Contract client will need to be re-initialized or reloaded to use the new ID
      setMessage({
        type: "success",
        text: "Contract address updated successfully! Please refresh the page to use the new contract.",
      });

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setMessage({ type: "error", text: `Failed to update: ${errorMessage}` });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box gap="xs" direction="column">
      <Box gap="xs" direction="row" align="baseline" wrap="wrap">
        <h2 className="text-lg" style={{ margin: 0 }}>
          Contract Address
        </h2>
        <p className="text-sm" style={{ margin: 0, color: "#6b7280" }}>
          (56 chars)
        </p>
      </Box>

      <Box gap="sm" direction="row" align="end" wrap="nowrap">
        <input
          className="input-field"
          id="contract-id"
          value={contractId}
          onChange={(e) => {
            setContractId(e.target.value);
            setMessage(null);
          }}
          placeholder="Enter contract ID"
          style={{
            width: "500px",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            flexShrink: 0,
          }}
        />
        <button
          className="btn btn-primary"
          onClick={handleUpdate}
          disabled={isUpdating || !contractId.trim()}
          style={{ flexShrink: 0 }}
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </Box>

      {message && (
        <p
          className="text-sm"
          style={{
            color: message.type === "success" ? "#00d4aa" : "#ff3864",
            margin: 0,
          }}
        >
          {message.text}
        </p>
      )}
    </Box>
  );
};
