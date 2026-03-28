import { PrismaClient } from "@/app/generated/prisma/client";
import { resolveDatabaseUrl } from "@/app/lib/resolveDatabaseUrl";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const databaseUrl = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
