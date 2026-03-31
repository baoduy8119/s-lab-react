import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REPO_ROOT } from "./db-url";

/** Resolve Prisma-style SQLite URLs: file:./prisma/dev.db or file:///abs/path */
export function resolveSqliteDatabasePath(databaseUrl: string): string {
  const u = databaseUrl.trim();
  if (!/^file:/i.test(u)) {
    throw new Error(`Expected SQLite file: URL, got: ${u.slice(0, 32)}…`);
  }
  if (/^file:\/\//i.test(u)) {
    return fileURLToPath(u);
  }
  const rest = u.slice("file:".length);
  const normalized = rest.replace(/^\.\//, "");
  return path.isAbsolute(normalized)
    ? normalized
    : path.join(REPO_ROOT, normalized);
}

export function readSiteContentRowsFromSqlite(databaseUrl: string): {
  key: string;
  data: string;
}[] {
  const filePath = resolveSqliteDatabasePath(databaseUrl);
  const db = new Database(filePath, { fileMustExist: true, readonly: true });
  try {
    return db
      .prepare(
        `SELECT "key", "data" FROM "SiteContent" ORDER BY "key" ASC`
      )
      .all() as { key: string; data: string }[];
  } finally {
    db.close();
  }
}
