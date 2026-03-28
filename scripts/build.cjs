/**
 * Postgres URL: DATABASE_URL, or Vercel defaults (POSTGRES_PRISMA_URL, store_*).
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");

const PG_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "PRISMA_DATABASE_URL",
  "POSTGRES_URL",
  "store_PRISMA_DATABASE_URL",
  "store_DATABASE_URL",
  "TARGET_DATABASE_URL",
];

function isPostgresUrl(v) {
  return /^postgres(ql)?:\/\//i.test(String(v).trim());
}

if (!process.env.DATABASE_URL?.trim() || !isPostgresUrl(process.env.DATABASE_URL)) {
  for (const k of PG_KEYS) {
    const v = process.env[k]?.trim();
    if (v && isPostgresUrl(v)) {
      process.env.DATABASE_URL = v;
      break;
    }
  }
}

if (!process.env.DATABASE_URL?.trim() || !isPostgresUrl(process.env.DATABASE_URL)) {
  console.error(
    "No Postgres DATABASE_URL. In Vercel: add DATABASE_URL or use Vercel Postgres (POSTGRES_PRISMA_URL / store_PRISMA_DATABASE_URL)."
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
