import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/demo/[slug]": ["./data/**/*"],
  },
  async redirects() {
    return [
      // /services was renamed to /solutions; keep old links and search results working.
      { source: "/services", destination: "/solutions", permanent: true },
    ];
  },
};

export default nextConfig;
