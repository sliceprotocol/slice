import React from "react";
import { useWallet } from "../hooks/useWallet";
import { stellarNetwork } from "../contracts/util";

// Format network name with first letter capitalized
const formatNetworkName = (name: string) =>
  // TODO: This is a workaround until @creit-tech/stellar-wallets-kit uses the new name for a local network.
  name === "STANDALONE"
    ? "Local"
    : name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const appNetwork = formatNetworkName(stellarNetwork);

const bgColor = "#F0F2F5";
const textColor = "#4A5362";

const NetworkPill: React.FC = () => {
  const { address } = useWallet();
  // Mock network for now as it's not in the simple wallet context
  const network = "TESTNET";

  // Check if there's a network mismatch
  const walletNetwork = formatNetworkName(network ?? "");
  const isNetworkMismatch = walletNetwork !== appNetwork;

  let title = "";
  let color = "#2ED06E";
  if (!address) {
    title = "Connect your wallet using this network.";
    color = "#C1C7D0";
  } else if (isNetworkMismatch) {
    title = `Wallet is on ${walletNetwork}, connect to ${appNetwork} instead.`;
    color = "#FF3B30";
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "4px 10px",
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: isNetworkMismatch ? "help" : "default",
      }}
      title={title}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
      {appNetwork}
    </div>
  );
};

export { NetworkPill as default };
