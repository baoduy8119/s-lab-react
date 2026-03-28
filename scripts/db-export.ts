import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "../app/generated/prisma/client";
import { REPO_ROOT, sqliteFileUrl } from "./db-url";

loadEnv({ path: path.join(REPO_ROOT, ".env.local") });
loadEnv({ path: path.join(REPO_ROOT, ".env") });

const sourceUrl =
  process.env.SOURCE_DATABASE_URL?.trim() ||
  process.env.DATABASE_URL?.trim() ||
  sqliteFileUrl("dev.db");

const outPath =
  process.argv[2] ?? path.join(REPO_ROOT, "prisma", "site-content.export.json");

const prisma = new PrismaClient({
  datasources: { db: { url: sourceUrl } },
});

async function main() {
  const rows = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    rows: rows.map((r) => ({
      key: r.key,
      data: r.data,
      updatedAt: r.updatedAt.toISOString(),
    })),
  };
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Exported ${rows.length} rows to ${outPath}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
