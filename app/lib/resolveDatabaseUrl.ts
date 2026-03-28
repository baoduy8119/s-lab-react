/**
 * Vercel Postgres / Storage often injects POSTGRES_PRISMA_URL or store_* names.
 * We accept those when DATABASE_URL was not duplicated manually.
 */
const ENV_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "PRISMA_DATABASE_URL",
  "POSTGRES_URL",
  "store_PRISMA_DATABASE_URL",
  "store_DATABASE_URL",
  /** Local: often set for db:push-content but app read DATABASE_URL — use as fallback */
  "TARGET_DATABASE_URL",
] as const;

function isPostgresUrl(value: string): boolean {
  return /^postgres(ql)?:\/\//i.test(value.trim());
}

export function resolveDatabaseUrl(): string {
  for (const key of ENV_KEYS) {
    const raw = process.env[key]?.trim();
    if (raw && isPostgresUrl(raw)) {
      return raw;
    }
  }
  throw new Error(
    "No Postgres URL found. Add DATABASE_URL to .env.local (same as your hosted DB), " +
      "or set TARGET_DATABASE_URL / POSTGRES_PRISMA_URL. " +
      "SOURCE_DATABASE_URL=file:... is only for db:push-content, not for Next.js."
  );
}
