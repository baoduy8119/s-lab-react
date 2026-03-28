/**
 * Copy all SiteContent from source Postgres → target Postgres.
 *
 * Example:
 *   TARGET_DATABASE_URL="postgresql://..." npm run db:push-content
 *
 * SOURCE defaults to DATABASE_URL in .env.local when SOURCE_DATABASE_URL is unset.
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { REPO_ROOT } from "./db-url";
import { migrateDeployTarget } from "./migrate-deploy-target";

loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
loadEnv({ path: path.join(REPO_ROOT, ".env") });

const sourceUrl =
  process.env.SOURCE_DATABASE_URL?.trim() ||
  process.env.DATABASE_URL?.trim();

if (!sourceUrl) {
  console.error(
    "Set DATABASE_URL or SOURCE_DATABASE_URL (Postgres) for the database to read from."
  );
  process.exit(1);
}

const targetUrl = process.env.TARGET_DATABASE_URL?.trim();

if (!targetUrl) {
  console.error(
    "Set TARGET_DATABASE_URL (e.g. same value as store_PRISMA_DATABASE_URL from Vercel)."
  );
  process.exit(1);
}

if (sourceUrl === targetUrl) {
  console.error("SOURCE and TARGET must differ.");
  process.exit(1);
}

migrateDeployTarget(targetUrl);

const sourcePrisma = new PrismaClient({
  datasources: { db: { url: sourceUrl } },
});
const targetPrisma = new PrismaClient({
  datasources: { db: { url: targetUrl } },
});

async function main() {
  const rows = await sourcePrisma.siteContent.findMany({
    orderBy: { key: "asc" },
  });
  for (const row of rows) {
    await targetPrisma.siteContent.upsert({
      where: { key: row.key },
      create: { key: row.key, data: row.data },
      update: { data: row.data },
    });
  }
  console.log(`Pushed ${rows.length} rows from local/source → target.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await sourcePrisma.$disconnect();
    await targetPrisma.$disconnect();
  });
