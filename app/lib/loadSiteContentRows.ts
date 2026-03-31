import { getPrisma } from "@/app/lib/prisma";

/**
 * Loads parsed JSON blobs for the given keys. Returns null per key on missing rows or DB errors.
 * Intended for Server Components only (uses Prisma).
 */
export async function loadSiteContentRows(
  keys: readonly string[]
): Promise<Record<string, unknown | null>> {
  const out: Record<string, unknown | null> = {};
  const unique = [...new Set(keys)];
  for (const k of unique) {
    out[k] = null;
  }

  try {
    const prisma = getPrisma();
    const rows = await prisma.siteContent.findMany({
      where: { key: { in: unique } },
    });
    for (const row of rows) {
      try {
        out[row.key] = JSON.parse(row.data) as unknown;
      } catch {
        out[row.key] = null;
      }
    }
  } catch {
    // DB unavailable — client hydrators can retry via the API
  }

  return out;
}
