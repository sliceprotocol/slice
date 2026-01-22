import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDev,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  transpilePackages: ["xo-connect"],

  // Note: The PWA plugin (@ducanh2912/next-pwa) injects webpack configuration
  // This causes conflicts with Turbopack. We use --webpack flag in dev script
  // to explicitly use webpack, or --turbopack if you want to use Turbopack
  // (but Turbopack may have issues with the PWA plugin)

  webpack: (config, { isServer }) => {
    // Suppress warnings for @metamask/sdk missing @react-native-async-storage
    // This is a false positive - the package is optional and not needed in web
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /@metamask\/sdk/,
        message: /Can't resolve '@react-native-async-storage\/async-storage'/,
      },
    ];
    return config;
  },
};

export default withPWA(nextConfig);
