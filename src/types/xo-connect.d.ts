declare module "xo-connect" {
  // 1. Define the shape of the Currency and Client objects
  // (Based on the library implementation you shared)
  export interface Currency {
    id: string;
    symbol: string;
    address: string;
    image: string;
    chainId: string; // This is the crucial field for your debugging
  }

  export interface Client {
    _id: string;
    alias: string;
    image: string;
    currencies: Currency[];
  }

  // 2. Define the Singleton Class Interface
  interface XOConnectInterface {
    getClient(): Promise<Client>;
  }

  // 3. Export the Singleton Instance
  // This matches 'export const XOConnect = new _XOConnect();' from the library
  export const XOConnect: XOConnectInterface;

  // 4. Export the Provider (Existing)
  export class XOConnectProvider {
    constructor(config: {
      rpcs: Record<string, string>;
      defaultChainId: string;
    });

    request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  }
}
