/**
 * Copy all SiteContent from local/source DB into a target DB in one step.
 *
 * Usage (production SQLite file or URL you can reach from this machine):
 *   TARGET_DATABASE_URL="file:/path/to/prod.db" npm run db:push-content
 *
 * Defaults SOURCE to repo prisma/dev.db if SOURCE_DATABASE_URL / DATABASE_URL unset.
 * Requires TARGET_DATABASE_URL (your production database).
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { REPO_ROOT, sqliteFileUrl } from "./db-url";
import { migrateDeployTarget } from "./migrate-deploy-target";

loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
loadEnv({ path: path.join(REPO_ROOT, ".env") });

const sourceUrl =
  process.env.SOURCE_DATABASE_URL?.trim() ||
  process.env.DATABASE_URL?.trim() ||
  sqliteFileUrl("dev.db");

const targetUrl = process.env.TARGET_DATABASE_URL?.trim();

if (!targetUrl) {
  console.error(
    "Set TARGET_DATABASE_URL to the database you want to update (e.g. production)."
  );
  console.error(
    'Example: TARGET_DATABASE_URL="file:/absolute/path/to/prod.db" npm run db:push-content'
  );
  console.error(
    "On Vercel, SQLite does not persist; use a hosted DB and the same URL in Vercel env."
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
