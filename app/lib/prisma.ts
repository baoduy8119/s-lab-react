import { PrismaClient } from "@/app/generated/prisma/client";
import path from "node:path";
import { pathToFileURL } from "node:url";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Same default as scripts/build.cjs when DATABASE_URL is unset (e.g. Vercel). */
function defaultSqliteUrl() {
  const file = path.join(process.cwd(), "prisma", "prod.db");
  return pathToFileURL(file).href;
}

const databaseUrl = process.env.DATABASE_URL?.trim() || defaultSqliteUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
