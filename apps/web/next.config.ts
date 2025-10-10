import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
