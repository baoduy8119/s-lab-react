import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Prisma custom output: ship query engines into the serverless bundle (App Router paths vary by Next version)
  outputFileTracingIncludes: {
    "/api/**/*": ["./app/generated/prisma/**/*"],
    "/api/**": ["./app/generated/prisma/**/*"],
    "/*": ["./app/generated/prisma/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3845',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
