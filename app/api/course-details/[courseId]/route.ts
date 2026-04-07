import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";
import { verifySessionToken, COOKIE_NAME } from "@/app/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SectionContent = Record<string, string>;
type SectionsById = Record<string, SectionContent>;

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store, max-age=0, must-revalidate" },
  });
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function extractLegacySectionsForCourse(legacyJson: unknown, courseId: string): SectionsById {
  // Legacy shape is usually { courseIds: string[], content: HomepageContent }.
  // But some callers treat it as HomepageContent directly.
  const content: unknown =
    isPlainObject(legacyJson) && isPlainObject(legacyJson.content) ? legacyJson.content : legacyJson;

  if (!isPlainObject(content)) return {};

  const out: SectionsById = {};
  const prefix = `${courseId}__`;
  for (const [k, v] of Object.entries(content)) {
    if (!k.startsWith(prefix)) continue;
    if (!isPlainObject(v)) continue;
    out[k] = v as SectionContent;
  }
  return out;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  if (!courseId) return noStoreJson({ error: "Missing courseId" }, 400);

  try {
    const prisma = getPrisma();
    const rows = await prisma.courseDetailSection.findMany({
      where: { courseId },
      select: { sectionId: true, data: true, updatedAt: true },
    });

    if (rows.length) {
      const sections: SectionsById = {};
      const updatedAtBySection: Record<string, string> = {};
      for (const r of rows) {
        sections[r.sectionId] = (r.data ?? {}) as SectionContent;
        updatedAtBySection[r.sectionId] = r.updatedAt.toISOString();
      }
      return noStoreJson({ sections, updatedAtBySection });
    }

    // Fallback to legacy blob for compatibility during rollout.
    const legacy = await prisma.siteContent.findUnique({
      where: { key: "courseDetails" },
      select: { data: true },
    });

    const legacyJson = legacy?.data ? JSON.parse(legacy.data) : null;
    const sections = extractLegacySectionsForCourse(legacyJson, courseId);
    return noStoreJson({ sections, legacy: true });
  } catch (err) {
    console.error("[api/course-details GET]", courseId, err);
    const message = err instanceof Error ? err.message : String(err);
    const showDetail = process.env.VERCEL_ENV !== "production";
    return noStoreJson(
      {
        error: "database_unavailable",
        hint:
          "Ensure this deployment has a Postgres URL set (DATABASE_URL or Postgres integration vars like POSTGRES_PRISMA_URL / store_PRISMA_DATABASE_URL). Redeploy after env changes.",
        ...(showDetail ? { detail: message.slice(0, 500) } : {}),
      },
      503
    );
  }
}

/**
 * Locked bulk update for many sections within a single course.
 * Requires `X-Course-Lock` token acquired from POST /api/course-details/:courseId/lock
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return noStoreJson({ error: "Unauthorized" }, 401);

  const session = await verifySessionToken(token);
  if (!session) return noStoreJson({ error: "Unauthorized" }, 401);

  const { courseId } = await params;
  if (!courseId) return noStoreJson({ error: "Missing courseId" }, 400);

  const lockToken = request.headers.get("x-course-lock") ?? "";
  if (!lockToken) return noStoreJson({ error: "lock_required", hint: "Missing X-Course-Lock" }, 428);

  const body = await request.json().catch(() => null);
  const sections = (body?.sections ?? null) as unknown;
  if (!isPlainObject(sections)) {
    return noStoreJson({ error: "invalid_payload", hint: "Expected { sections: Record<sectionId, object> }" }, 400);
  }

  try {
    const prisma = getPrisma();
    const now = new Date();

    const lock = await prisma.courseEditLock.findUnique({
      where: { courseId },
      select: { ownerToken: true, expiresAt: true },
    });
    if (!lock || lock.ownerToken !== lockToken) {
      return noStoreJson({ error: "lock_invalid" }, 409);
    }
    if (lock.expiresAt.getTime() <= now.getTime()) {
      return noStoreJson({ error: "lock_expired" }, 409);
    }

    const nextExpiry = new Date(now.getTime() + 5 * 60 * 1000);

    const entries = Object.entries(sections);
    const prefix = `${courseId}__`;
    for (const [sectionId, data] of entries) {
      if (typeof sectionId !== "string" || !sectionId.startsWith(prefix)) {
        return noStoreJson(
          { error: "invalid_section", hint: `Section id must start with ${prefix}` },
          400
        );
      }
      if (!isPlainObject(data)) {
        return noStoreJson({ error: "invalid_section", hint: "Section content must be an object" }, 400);
      }
    }

    // Use the "batch" transaction API (array form) to avoid interactive-transaction
    // flakiness in dev/hot-reload environments.
    await prisma.$transaction([
      prisma.courseEditLock.update({
        where: { courseId },
        data: { expiresAt: nextExpiry },
      }),
      ...entries.map(([sectionId, data]) =>
        prisma.courseDetailSection.upsert({
          where: { courseId_sectionId: { courseId, sectionId } },
          create: { courseId, sectionId, data: data as object },
          update: { data: data as object },
        })
      ),
    ]);

    return noStoreJson({ success: true, expiresAt: nextExpiry.toISOString() });
  } catch (err) {
    console.error("[api/course-details PUT]", courseId, err);
    const message = err instanceof Error ? err.message : String(err);
    const showDetail = process.env.VERCEL_ENV !== "production";
    return noStoreJson(
      {
        error: "database_unavailable",
        hint:
          "Ensure this deployment has a Postgres URL set (DATABASE_URL or Postgres integration vars like POSTGRES_PRISMA_URL / store_PRISMA_DATABASE_URL). Redeploy after env changes.",
        ...(showDetail ? { detail: message.slice(0, 500) } : {}),
      },
      503
    );
  }
}

