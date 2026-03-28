/**
 * Shared Postgres URL resolution for Next.js, Vercel build, and Prisma CLI.
 * Marketplace integrations use varying names (store_*, NEON_*, etc.).
 */

function isPostgresUrl(value) {
  return /^postgres(ql)?:\/\//i.test(String(value).trim());
}

/** Local / default order */
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

/** On Vercel, pooled Prisma URLs must come before a generic DATABASE_URL copy */
const PREFERRED_KEYS_VERCEL = [
  "POSTGRES_PRISMA_URL",
  "PRISMA_DATABASE_URL",
  "store_PRISMA_DATABASE_URL",
  "store_DATABASE_URL",
  "store_POSTGRES_URL",
  "DATABASE_URL",
  "POSTGRES_URL",
  "NEON_DATABASE_URL",
  "STORAGE_PRISMA_DATABASE_URL",
];

/**
 * Hosted Postgres almost always needs TLS from Vercel.
 * @param {string} url
 * @param {NodeJS.ProcessEnv} env
 */
function normalizePostgresUrl(url, env = process.env) {
  let u = String(url).trim();
  if (!isPostgresUrl(u)) return u;

  const hostLikelyRequiresSsl =
    env.VERCEL === "1" ||
    /neon\.tech|prisma\.io|supabase\.co|render\.com|azure\.com|pooler|vercel-storage|amazonaws\.com/i.test(
      u
    );

  if (hostLikelyRequiresSsl && !/sslmode=/i.test(u)) {
    u += (u.includes("?") ? "&" : "?") + "sslmode=require";
  }

  return u;
}

/**
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {string | undefined}
 */
function resolvePostgresDatabaseUrl(env = process.env) {
  const onVercel = env.VERCEL === "1";
  const order = onVercel ? PREFERRED_KEYS_VERCEL : PREFERRED_KEYS;

  for (const key of order) {
    const raw = env[key];
    if (typeof raw !== "string") continue;
    const v = raw.trim();
    if (v && isPostgresUrl(v)) return normalizePostgresUrl(v, env);
  }

  const preferredSet = new Set([...PREFERRED_KEYS, ...PREFERRED_KEYS_VERCEL]);
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
  if (scored.length) return normalizePostgresUrl(scored[0].v, env);

  if (!onVercel) {
    const t = env.TARGET_DATABASE_URL;
    if (typeof t === "string") {
      const v = t.trim();
      if (v && isPostgresUrl(v)) return normalizePostgresUrl(v, env);
    }
  }

  return undefined;
}

module.exports = { resolvePostgresDatabaseUrl, isPostgresUrl, normalizePostgresUrl };
