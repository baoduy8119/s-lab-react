import "dotenv/config";
import { resolveDatabaseUrl } from "./app/lib/resolveDatabaseUrl";
import { defineConfig } from "prisma/config";

let prismaCliDatasourceUrl = "";
try {
  prismaCliDatasourceUrl = resolveDatabaseUrl();
} catch {
  prismaCliDatasourceUrl = process.env.DATABASE_URL ?? "";
}

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
