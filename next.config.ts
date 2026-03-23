import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'i.scdn.co' },
      { hostname: 'a.ltrbxd.com' },
      { hostname: 'media.steampowered.com' },
      { hostname: 'cdn.cloudflare.steamstatic.com' },
      { hostname: 'pub-7709eb4c4c404d9bb9680872898eaf3e.r2.dev' },
    ],
  },
};

export default nextConfig;
