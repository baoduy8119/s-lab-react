import "dotenv/config";
import { createRequire } from "node:module";
import { defineConfig } from "prisma/config";

const require = createRequire(import.meta.url);
const { resolvePostgresDatabaseUrl } = require("./app/lib/postgresEnv.js");

const prismaCliDatasourceUrl =
  resolvePostgresDatabaseUrl(process.env) ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: prismaCliDatasourceUrl,
  },
});
