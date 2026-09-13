import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Wix Media Manager — where CMS-uploaded product/hero images are served from.
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
