import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["zod"],
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
    optimizePackageImports: [
      "axios",
      "@radix/ui",
      "react-slick",
      "react-day-picker",
      "lucide-react",
    ],
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
    qualities: [50, 60, 70, 80, 90, 100],
  },
};

export default nextConfig;
