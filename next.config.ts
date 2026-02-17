import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  experimental: {
    // Suppress Node.js deprecation warnings
  },
  webpack: (config) => {
    // Suppress the url.parse deprecation warning
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules.*/ },
    ]
    return config
  },
};

export default nextConfig;
