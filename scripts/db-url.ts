import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = path.join(__dirname, "..");

export function sqliteFileUrl(dbFileName: string): string {
  return pathToFileURL(path.join(REPO_ROOT, "prisma", dbFileName)).href;
}
