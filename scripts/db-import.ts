import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { REPO_ROOT, sqliteFileUrl } from "./db-url";
import { migrateDeployTarget } from "./migrate-deploy-target";

loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
loadEnv({ path: path.join(REPO_ROOT, ".env") });

const targetUrl =
  process.env.TARGET_DATABASE_URL?.trim() ||
  process.env.DATABASE_URL?.trim() ||
  sqliteFileUrl("prod.db");

const importPath =
  process.argv[2] ?? path.join(REPO_ROOT, "prisma", "site-content.export.json");

if (!fs.existsSync(importPath)) {
  console.error(`Missing export file: ${importPath}`);
  console.error("Run: npm run db:export");
  process.exit(1);
}

migrateDeployTarget(targetUrl);

const prisma = new PrismaClient({
  datasources: { db: { url: targetUrl } },
});

type ExportPayload = {
  rows: { key: string; data: string }[];
};

async function main() {
  const raw = fs.readFileSync(importPath, "utf8");
  const payload = JSON.parse(raw) as ExportPayload;
  if (!Array.isArray(payload.rows)) {
    console.error("Invalid export file: expected { rows: [...] }");
    process.exit(1);
  }
  for (const row of payload.rows) {
    await prisma.siteContent.upsert({
      where: { key: row.key },
      create: { key: row.key, data: row.data },
      update: { data: row.data },
    });
  }
  console.log(`Imported ${payload.rows.length} rows (target: ${targetUrl})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
