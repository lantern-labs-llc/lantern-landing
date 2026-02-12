import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "info.wellroomva.com" }],
        destination: "/b/well-room/:path*",
      },
    ];
  },
};

export default nextConfig;
