/** Prisma `provider = postgresql"` only accepts postgres:// or postgresql:// URLs. */
export function assertPostgresUrl(url: string, label: string): void {
  const u = url.trim();
  if (!/^postgres(ql)?:\/\//i.test(u)) {
    console.error(
      `${label} must be a PostgreSQL URL (postgresql:// or postgres://).`
    );
    console.error(
      "SQLite file: URLs are not valid. Put a Postgres connection string in .env.local as DATABASE_URL (e.g. Neon dev DB, or Vercel / Docker Postgres)."
    );
    process.exit(1);
  }
}
