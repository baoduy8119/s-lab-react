/**
 * Resolves Postgres URL (shared logic in app/lib/postgresEnv.js).
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");

const { resolvePostgresDatabaseUrl, isPostgresUrl } = require(path.join(
  root,
  "app/lib/postgresEnv.js"
));

const resolved = resolvePostgresDatabaseUrl(process.env);
if (resolved) {
  process.env.DATABASE_URL = resolved;
}

if (!process.env.DATABASE_URL?.trim() || !isPostgresUrl(process.env.DATABASE_URL)) {
  console.error(
    "No Postgres DATABASE_URL. In Vercel: link Storage → Postgres and/or set DATABASE_URL for Production; redeploy."
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
