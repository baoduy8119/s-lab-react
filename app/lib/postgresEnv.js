/**
 * Shared Postgres URL resolution for Next.js, Vercel build, and Prisma CLI.
 * Marketplace integrations use varying names (store_*, NEON_*, etc.).
 */

function isPostgresUrl(value) {
  return /^postgres(ql)?:\/\//i.test(String(value).trim());
}

const PREFERRED_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "PRISMA_DATABASE_URL",
  "POSTGRES_URL",
  "NEON_DATABASE_URL",
  "STORAGE_PRISMA_DATABASE_URL",
  "store_PRISMA_DATABASE_URL",
  "store_DATABASE_URL",
  "store_POSTGRES_URL",
];

/**
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string | undefined}
 */
function resolvePostgresDatabaseUrl(env = process.env) {
  const onVercel = env.VERCEL === "1";

  for (const key of PREFERRED_KEYS) {
    const raw = env[key];
    if (typeof raw !== "string") continue;
    const v = raw.trim();
    if (v && isPostgresUrl(v)) return v;
  }

  const preferredSet = new Set(PREFERRED_KEYS);
  const scored = [];

  for (const [key, raw] of Object.entries(env)) {
    if (typeof raw !== "string") continue;
    const v = raw.trim();
    if (!v || !isPostgresUrl(v)) continue;
    if (preferredSet.has(key)) continue;
    if (/^npm_/i.test(key)) continue;
    if (/SOURCE_DATABASE/i.test(key)) continue;
    if (onVercel && /TARGET_DATABASE/i.test(key)) continue;

    let score = 0;
    if (/prisma/i.test(key)) score += 8;
    if (/pool/i.test(key)) score += 5;
    if (/postgres/i.test(key)) score += 4;
    if (/database/i.test(key)) score += 3;
    if (/neon/i.test(key)) score += 3;
    if (/^store_/i.test(key)) score += 2;
    if (/target/i.test(key)) score -= 50;
    scored.push({ key, v, score });
  }

  scored.sort((a, b) => b.score - a.score);
  if (scored.length) return scored[0].v;

  if (!onVercel) {
    const t = env.TARGET_DATABASE_URL;
    if (typeof t === "string") {
      const v = t.trim();
      if (v && isPostgresUrl(v)) return v;
    }
  }

  return undefined;
}

module.exports = { resolvePostgresDatabaseUrl, isPostgresUrl };
