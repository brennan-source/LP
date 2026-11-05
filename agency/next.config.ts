import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/demo/[slug]": ["./data/**/*"],
  },
  async redirects() {
    return [
      // /services was renamed to /solutions; keep old links and search results working.
      { source: "/services", destination: "/solutions", permanent: true },
      // Retired November 2026: the free-website preview pages and the Growth Score tool.
      // Old links go to the Growth Gap Review instead.
      { source: "/preview/:path*", destination: "/contact", permanent: true },
      { source: "/growth-score/:path*", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
