import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // Rewrite /api/v1/:path* → /api/proxy/v1/:path*
        // This makes all client-side api.get("/api/v1/...") calls go through
        // the Next.js proxy instead of directly to Railway (fixing CORS).
        source: "/api/v1/:path*",
        destination: "/api/proxy/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
