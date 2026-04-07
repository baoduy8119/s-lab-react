import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";
import { verifySessionToken, COOKIE_NAME } from "@/app/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store, max-age=0, must-revalidate" },
  });
}

const LOCK_TTL_MS = 5 * 60 * 1000;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return noStoreJson({ error: "Unauthorized" }, 401);

  const session = await verifySessionToken(token);
  if (!session) return noStoreJson({ error: "Unauthorized" }, 401);

  const { courseId } = await params;
  if (!courseId) return noStoreJson({ error: "Missing courseId" }, 400);

  try {
    const prisma = getPrisma();
    const now = new Date();
    const nextExpiry = new Date(now.getTime() + LOCK_TTL_MS);

    const existing = await prisma.courseEditLock.findUnique({
      where: { courseId },
      select: { ownerId: true, ownerToken: true, expiresAt: true },
    });

    // If locked by someone else and not expired -> conflict.
    if (existing && existing.expiresAt.getTime() > now.getTime() && existing.ownerId !== session.sub) {
      return noStoreJson(
        {
          error: "locked",
          hint: "This course is being edited by another user. Try again later.",
          expiresAt: existing.expiresAt.toISOString(),
        },
        409
      );
    }

    // If same owner or expired/no lock -> (re)acquire with a fresh token.
    const ownerToken = crypto.randomUUID();
    const lock = await prisma.courseEditLock.upsert({
      where: { courseId },
      create: {
        courseId,
        ownerId: session.sub,
        ownerToken,
        expiresAt: nextExpiry,
      },
      update: {
        ownerId: session.sub,
        ownerToken,
        expiresAt: nextExpiry,
      },
      select: { ownerToken: true, expiresAt: true },
    });

    return noStoreJson({ lockToken: lock.ownerToken, expiresAt: lock.expiresAt.toISOString() });
  } catch (err) {
    console.error("[api/course-details lock]", courseId, err);
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

