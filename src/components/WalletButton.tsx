import { useWallet } from "../providers/WalletProvider";

export const WalletButton = () => {
  const { address, isPending, connect, disconnect } = useWallet();

  if (!address) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => void connect()}
        disabled={isPending}
      >
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div
      onClick={() => void disconnect()}
      style={{
        cursor: "pointer",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "20px",
        fontSize: "0.9rem",
        background: "#fff"
      }}
    >
      <span style={{ marginRight: "8px" }}>🟢</span>
      {address.slice(0, 6)}...{address.slice(-4)}
    </div>
  );
};
