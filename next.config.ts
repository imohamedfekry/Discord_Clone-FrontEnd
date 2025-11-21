import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // هنا نحط rewrites
  async rewrites() {
    return [
      {
        source: "/channels/@me",
        destination: "/channels/me",
      },
    ];
  },
};

export default nextConfig;
