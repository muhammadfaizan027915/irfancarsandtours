import type { NextConfig } from "next";
import analyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  transpilePackages: [
    "@icat/contracts",
    "@icat/database",
    "@icat/features",
    "@icat/lib",
    "@icat/repositories",
    "@icat/services",
    "@icat/ui",
  ],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com" }],
  },
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
