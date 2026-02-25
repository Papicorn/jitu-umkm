import type { NextConfig } from "next";

type NextConfigWithDevOrigins = NextConfig & {
  experimental?: NextConfig["experimental"] & {
    allowedDevOrigins?: string[];
  };
};

const nextConfig: NextConfigWithDevOrigins = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    allowedDevOrigins: [
      "http://localhost:5665",
      "http://127.0.0.1:5665",
      "http://45.207.157.248:5665",
      "http://172.67.170.19:5665",
      "http://104.21.39.80:5665",
    ],
  },
};

export default nextConfig;