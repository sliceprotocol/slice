"use client";

import React, { useState } from "react";
import { DepositIcon, SendIcon, ReceiveIcon } from "./icons/ActionIcons";
import styles from "./BalanceCard.module.css";
import { useXOContracts } from "@/providers/XOContractsProvider";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { SendModal } from "./SendModal";
import { ReceiveModal } from "./ReceiveModal";
import { useChainId } from "wagmi";
import { getContractsForChain } from "@/config/contracts";
import { useFundWallet } from "@privy-io/react-auth";

export const BalanceCard: React.FC = () => {
  const chainId = useChainId();
  const { address } = useXOContracts();
  const { usdcToken } = getContractsForChain(chainId);
  const { formatted, isLoading } = useTokenBalance(usdcToken);

  const { fundWallet } = useFundWallet();

  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);

  const displayBalance = React.useMemo(() => {
    if (!address) return "---";
    if (isLoading) return "Loading...";
    if (formatted === undefined || formatted === null) return "N/A";
    const balance = parseFloat(formatted).toFixed(2);
    return `${balance} USDC`;
  }, [address, isLoading, formatted]);

  const handleDeposit = () => {
    if (!address) return;

    // TODO! Add this in a config
    fundWallet({
      address,
      options: {
        chain: { id: chainId },
        asset: "USDC",
      },
    });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.leftSection}>
          <div className={styles.balanceSection}>
            <div className={styles.balanceLabel}>Balance</div>
            <div className={styles.balanceAmount}>{displayBalance}</div>
          </div>
          <button className={styles.billingButton}>Billing Profile</button>
        </div>

        <div className={styles.actionButtons} style={{ gap: "12px" }}>
          <button className={styles.actionButton} onClick={handleDeposit}>
            <DepositIcon className={styles.actionIcon} />
            <span className={styles.actionLabel}>Deposit</span>
          </button>

          <button
            className={styles.actionButton}
            onClick={() => setIsReceiveOpen(true)}
          >
            <ReceiveIcon className={styles.actionIcon} />
            <span className={styles.actionLabel}>Receive</span>
          </button>

          <button
            className={styles.actionButton}
            onClick={() => setIsSendOpen(true)}
          >
            <SendIcon className={styles.actionIcon} />
            <span className={styles.actionLabel}>Send</span>
          </button>
        </div>
      </div>

      {isSendOpen && (
        <SendModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />
      )}

      {isReceiveOpen && (
        <ReceiveModal
          isOpen={isReceiveOpen}
          onClose={() => setIsReceiveOpen(false)}
        />
      )}
    </>
  );
};
