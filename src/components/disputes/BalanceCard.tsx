"use client";

import React from "react";
import { useBalance } from "wagmi";
import { DepositIcon, SendIcon } from "./icons/ActionIcons";
import styles from "./BalanceCard.module.css";
import { useXOContracts } from "@/providers/XOContractsProvider";

export const BalanceCard: React.FC = () => {
  const { address } = useXOContracts();

  // Fetch native balance (ETH/MATIC etc depending on chain)
  const { data, isError, isLoading } = useBalance({
    address: address as `0x${string}` | undefined,
  });

  const displayBalance = React.useMemo(() => {
    if (!address) return "---";
    if (isLoading) return "Loading...";
    if (isError || !data) return "Error";

    const balance = parseFloat(data.formatted).toFixed(4);
    return `${balance} ${data.symbol}`;
  }, [address, isLoading, isError, data]);

  return (
    <div className={styles.card}>
      <div className={styles.leftSection}>
        <div className={styles.balanceSection}>
          <div className={styles.balanceLabel}>Balance</div>
          <div className={styles.balanceAmount}>{displayBalance}</div>
        </div>
        <button className={styles.billingButton}>Billing Profile</button>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.actionButton}>
          <DepositIcon className={styles.actionIcon} />
          <span className={styles.actionLabel}>Deposit</span>
        </button>

        <button className={styles.actionButton}>
          <SendIcon className={styles.actionIcon} />
          <span className={styles.actionLabel}>Send</span>
        </button>
      </div>
    </div>
  );
};
