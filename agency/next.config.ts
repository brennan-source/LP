import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/demo/[slug]": ["./data/**/*"],
  },
};

export default nextConfig;
