import "dotenv/config";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { defineConfig } from "prisma/config";

const defaultDevDb = pathToFileURL(
  path.join(__dirname, "prisma", "dev.db")
).href;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL ?? defaultDevDb,
  },
});
