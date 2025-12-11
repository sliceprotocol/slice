"use client";

import React from "react";
import { useBalance } from "wagmi";
import { DepositIcon, SendIcon } from "./icons/ActionIcons";
import styles from "./BalanceCard.module.css";
import { useXOContracts } from "@/providers/XOContractsProvider";
// 1. Import the USDC Address
import { USDC_ADDRESS } from "@/config";

export const BalanceCard: React.FC = () => {
  const { address } = useXOContracts();

  // 2. Pass the 'token' prop to fetch ERC20 instead of Native ETH
  const { data, isError, isLoading } = useBalance({
    address: address as `0x${string}` | undefined,
    token: USDC_ADDRESS as `0x${string}`,
  });

  const displayBalance = React.useMemo(() => {
    if (!address) return "---";
    if (isLoading) return "Loading...";
    if (isError || !data) return "Error";

    // 3. USDC has 6 decimals, show 2 for UI
    const balance = parseFloat(data.formatted).toFixed(2);
    // 4. Force the symbol to USDC just to be safe/consistent
    return `${balance} USDC`;
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
