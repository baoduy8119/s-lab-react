/**
 * Copy SiteContent → Postgres (production).
 *
 * Source:
 *   - Postgres: DATABASE_URL or SOURCE_DATABASE_URL (postgresql://...)
 *   - SQLite file: SOURCE_DATABASE_URL=file:./prisma/dev.db (or absolute file: URL)
 *
 * Target (required):
 *   TARGET_DATABASE_URL=postgresql://...
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { assertPostgresUrl } from "./assert-postgres-url";
import { REPO_ROOT } from "./db-url";
import { migrateDeployTarget } from "./migrate-deploy-target";
import { readSiteContentRowsFromSqlite } from "./read-sqlite-site-content";

loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
loadEnv({ path: path.join(REPO_ROOT, ".env") });

const sourceUrlRaw =
  process.env.SOURCE_DATABASE_URL?.trim() ||
  process.env.DATABASE_URL?.trim();

if (!sourceUrlRaw) {
  console.error(
    "Set SOURCE_DATABASE_URL or DATABASE_URL.\n" +
      "  SQLite source example: SOURCE_DATABASE_URL=file:./prisma/dev.db\n" +
      "  Postgres source: DATABASE_URL=postgresql://... in .env.local"
  );
  process.exit(1);
}

const sourceUrl = sourceUrlRaw;

const targetUrlRaw = process.env.TARGET_DATABASE_URL?.trim();

if (!targetUrlRaw) {
  console.error(
    "Set TARGET_DATABASE_URL (e.g. same value as store_PRISMA_DATABASE_URL from Vercel)."
  );
  process.exit(1);
}

const targetUrl = targetUrlRaw;

if (sourceUrl === targetUrl) {
  console.error("SOURCE and TARGET must differ.");
  process.exit(1);
}

const sourceIsSqlite = /^file:/i.test(sourceUrl);
if (!sourceIsSqlite) {
  assertPostgresUrl(sourceUrl, "SOURCE_DATABASE_URL / DATABASE_URL (source)");
}
assertPostgresUrl(targetUrl, "TARGET_DATABASE_URL");

migrateDeployTarget(targetUrl);

const targetPrisma = new PrismaClient({
  datasources: { db: { url: targetUrl } },
});

let sourcePrisma: PrismaClient | null = null;
if (!sourceIsSqlite) {
  sourcePrisma = new PrismaClient({
    datasources: { db: { url: sourceUrl } },
  });
}

async function main() {
  const rows = sourceIsSqlite
    ? readSiteContentRowsFromSqlite(sourceUrl)
    : await sourcePrisma!.siteContent.findMany({ orderBy: { key: "asc" } });

  for (const row of rows) {
    await targetPrisma.siteContent.upsert({
      where: { key: row.key },
      create: { key: row.key, data: row.data },
      update: { data: row.data },
    });
  }
  console.log(
    `Pushed ${rows.length} rows from ${sourceIsSqlite ? "SQLite" : "Postgres"} → target.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await sourcePrisma?.$disconnect();
    await targetPrisma.$disconnect();
  });
