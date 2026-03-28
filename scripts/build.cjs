/**
 * Requires DATABASE_URL (Postgres). On Vercel, set DATABASE_URL to the same
 * value as store_PRISMA_DATABASE_URL from Vercel Storage.
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");

if (!process.env.DATABASE_URL?.trim()) {
  console.error(
    "DATABASE_URL is not set. For Vercel: add env var DATABASE_URL = value of store_PRISMA_DATABASE_URL."
  );
  process.exit(1);
}

const env = process.env;

for (const cmd of [
  "npx prisma generate",
  "npx prisma migrate deploy",
  "npx next build",
]) {
  const r = spawnSync(cmd, {
    cwd: root,
    env,
    shell: true,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}
