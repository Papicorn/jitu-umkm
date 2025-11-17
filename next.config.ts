import type { NextConfig } from "next";

type NextConfigWithDevOrigins = NextConfig & {
  experimental?: NextConfig["experimental"] & {
    // belum ada di type resmi, tapi sudah tersedia di Next 16 dev server
    allowedDevOrigins?: string[];
  };
};

const nextConfig: NextConfigWithDevOrigins = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.100.99:3000",
    ],
  },
};

export default nextConfig;