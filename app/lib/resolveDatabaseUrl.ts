import { resolvePostgresDatabaseUrl } from "./postgresEnv.js";

export function resolveDatabaseUrl(): string {
  const url = resolvePostgresDatabaseUrl(process.env);
  if (!url) {
    throw new Error(
      "No Postgres URL found. In Vercel → Settings → Environment Variables, " +
        "ensure Production has DATABASE_URL or the Postgres integration variables " +
        "(e.g. POSTGRES_PRISMA_URL, store_PRISMA_DATABASE_URL). " +
        "Redeploy after changing env. " +
        "SOURCE_DATABASE_URL=file:... is only for db:push-content."
    );
  }
  return url;
}
