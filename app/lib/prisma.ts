import { PrismaClient } from "@prisma/client";
import { resolveDatabaseUrl } from "@/app/lib/resolveDatabaseUrl";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Lazy init so missing env on one request does not crash module load; reuse one client per instance. */
export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  const databaseUrl = resolveDatabaseUrl();
  const client = new PrismaClient({
    datasources: { db: { url: databaseUrl } },
  });
  globalForPrisma.prisma = client;
  return client;
}
