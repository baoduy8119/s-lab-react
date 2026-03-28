import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Same default as scripts/build.cjs when DATABASE_URL is unset (e.g. Vercel). */
const databaseUrl =
  process.env.DATABASE_URL?.trim() || "file:./prisma/prod.db";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
