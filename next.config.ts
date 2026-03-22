import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'i.scdn.co' }, { hostname: 'a.ltrbxd.com' }],
  },
};

export default nextConfig;
