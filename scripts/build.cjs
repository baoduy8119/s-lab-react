/**
 * Resolves Postgres URL (shared logic in app/lib/postgresEnv.js).
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");

// Load local env files for node scripts (Prisma/Next don't auto-load `.env` here).
// On Vercel, environment variables are injected, so we avoid overriding them.
if (process.env.VERCEL !== "1") {
  const dotenv = require("dotenv");
  dotenv.config({ path: path.join(root, ".env") });
  dotenv.config({ path: path.join(root, ".env.local"), override: true });
}

const { resolvePostgresDatabaseUrl, isPostgresUrl } = require(
  path.join(root, "app/lib/postgresEnv.js")
);

const resolved = resolvePostgresDatabaseUrl(process.env);
if (resolved) {
  process.env.DATABASE_URL = resolved;
}

const env = process.env;

function run(cmd) {
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

// `prisma generate` does not require a live DB connection; run it unconditionally so
// production builds never ship with a stale Prisma Client (even with cached installs).
run("npx prisma generate");

const hasPostgresDbUrl =
  !!process.env.DATABASE_URL?.trim() && isPostgresUrl(process.env.DATABASE_URL);

if (!hasPostgresDbUrl) {
  console.warn(
    "No Postgres DATABASE_URL at build time; skipping `prisma migrate deploy`. " +
      "In Vercel: link Storage → Postgres and/or set DATABASE_URL for Production; redeploy."
  );
} else {
  run("npx prisma migrate deploy");
}

run("npx next build");
