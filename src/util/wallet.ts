export interface Balance {
  asset_type: string;
  balance: string;
}

export const fetchBalance = async (address: string): Promise<Balance[]> => {
  return [{ asset_type: "native", balance: "100" }];
};

export const connectWallet = async () => {
  console.log("Mock connect wallet");
};

export const disconnectWallet = async () => {
  console.log("Mock disconnect wallet");
};
