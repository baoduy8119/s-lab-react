import { spawnSync } from "node:child_process";
import { REPO_ROOT } from "./db-url";

/** Apply prisma/migrations to the given database (creates tables if missing). */
export function migrateDeployTarget(databaseUrl: string) {
  const r = spawnSync("npx prisma migrate deploy", {
    cwd: REPO_ROOT,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    shell: true,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}
