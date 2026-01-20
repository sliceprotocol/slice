const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE1NTkwMDQsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2RTdiNWZBNjFBOTFDN2E5NDY5NkVkQ0I2QTQwQWRGMWY5RTYxMzk3In0",
    payload: "eyJkb21haW4iOiJiYXNlLnNsaWNlaHViLnh5eiJ9",
    signature:
      "VaFpDdWVDRRhaTpPV72VGnBn+qsEcpD8QWDuWLa2oUUaGmvJpnWERVFPCkF8u8NVi/opvS3pq4hQTcihCCNMtxw=",
  },
  baseBuilder: {
    ownerAddress: "",
  },
  miniapp: {
    version: "1",
    name: "base-miniapp",
    subtitle: "",
    description: "",
    screenshotUrls: [],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "utility",
    tags: ["example"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
