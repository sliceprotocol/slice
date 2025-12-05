import React, { useTransition } from "react";
import { useNotification } from "../hooks/useNotification";
import { useWallet } from "../hooks/useWallet";
import { fundAccount } from "../util/friendbot";
import { useWalletBalance } from "../hooks/useWalletBalance";

const FundAccountButton: React.FC = () => {
  const { addNotification } = useNotification();
  const [isPending, startTransition] = useTransition();
  const { isFunded, isLoading } = useWalletBalance();
  const { address } = useWallet();

  if (!address) return null;

  const handleFundAccount = () => {
    startTransition(async () => {
      try {
        await fundAccount(address);
        addNotification("Account funded successfully!", "success");
      } catch {
        addNotification("Error funding account. Please try again.", "error");
      }
    });
  };

  return (
    <div title={isFunded ? "Account is already funded" : "Fund your account using the Stellar Friendbot"}>
      <button
        className="btn btn-primary"
        disabled={isPending || isLoading || isFunded}
        onClick={handleFundAccount}
      >
        Fund Account
      </button>
    </div>
  );
};

export { FundAccountButton as default };
