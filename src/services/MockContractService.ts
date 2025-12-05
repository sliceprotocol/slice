import slice from "../contracts/slice";

// Mock contract client that mimics the structure expected by the app
export const mockContractClient = {
  options: {
    publicKey: undefined as string | undefined,
  },
  add_funds: async (args: any) => ({
    signAndSend: async (opts: any) => ({ result: { unwrap: () => "mock-tx-hash-123" } }),
  }),
  prize_pot: async () => ({
    result: BigInt(10000000), // Mock 1 XLM (10^7 stroops)
  }),
};

export const MockContractService = {
  slice,
  contractClient: mockContractClient,

  extractTransactionData: (result: any) => ({
    success: true,
    txHash: "mock-tx-hash-123",
  }),

  formatStroopsToXlm: (stroops: string) => {
    const xlm = Number(stroops) / 10000000;
    return xlm.toFixed(7);
  },
};
