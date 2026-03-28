/**
 * Vercel (and other CI) often omit DATABASE_URL; Prisma still validates
 * env("DATABASE_URL") in schema.prisma. Default matches app/lib/prisma.ts.
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.join(__dirname, "..");
const DEFAULT_DATABASE_URL = pathToFileURL(
  path.join(root, "prisma", "prod.db")
).href;

if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
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
