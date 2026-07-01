import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/600-ai-animated-god-reels-bundle",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
