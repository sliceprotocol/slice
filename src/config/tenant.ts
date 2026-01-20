export enum Tenant {
  WEB = "web", // PWA, Localhost (Privy + Base Sepolia)
  BEEXO = "beexo", // Beexo MiniApp (Pure Wagmi + Base Mainnet)
}

export const getTenantFromHost = (host: string | null): Tenant => {
  if (!host) return Tenant.WEB; // Default to Web for safety

  // Handle localhost (remove port)
  const hostname = host.split(":")[0];

  // Strategy Mapping
  if (hostname.startsWith("beexo.") || hostname.startsWith("mini.")) {
    return Tenant.BEEXO;
  }

  // Default Catch-all (app.slicehub.xyz, localhost, etc.)
  return Tenant.WEB;
};
