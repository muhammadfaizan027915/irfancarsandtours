import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  outputFileTracingRoot: path.join(__dirname, "../../"),

  outputFileTracingIncludes: {
    "/**": ["packages/**"],
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

  experimental: {
    optimizeCss: true,
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com" }],
    qualities: [50, 60, 70, 80]
  },
};

export default nextConfig;
