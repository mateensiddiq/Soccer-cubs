import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // No legitimate reason for this site to be framed by another
          // page — blocks clickjacking attempts on the sign-up/payment flow.
          { key: "X-Frame-Options", value: "DENY" },
          // Stops browsers from guessing a response's content type in a
          // way that could turn an upload into executable content.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Sends the full URL only to our own pages; other sites just
          // get the origin.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site never needs camera/mic/location access.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
