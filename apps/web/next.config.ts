import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: false,

  outputFileTracingRoot: path.join(__dirname, "../../"),

  cacheComponents: true,

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
    optimizeCss: true
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "storage.googleapis.com" }],
    qualities: [50, 60, 70, 80, 90, 100]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  redirects() {
    return [
      {
        source: "/bookings",
        destination: "/bookings/cars",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/bookings/cars",
        permanent: true,
      },

      {
        source: "/dashboard/bookings",
        destination: "/dashboard/bookings/cars",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
