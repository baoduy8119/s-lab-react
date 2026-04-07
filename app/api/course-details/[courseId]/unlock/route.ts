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

  const lockToken = request.headers.get("x-course-lock") ?? "";
  if (!lockToken) return noStoreJson({ error: "lock_required" }, 428);

  try {
    const prisma = getPrisma();
    const lock = await prisma.courseEditLock.findUnique({
      where: { courseId },
      select: { ownerId: true, ownerToken: true },
    });
    if (!lock) return noStoreJson({ success: true });
    if (lock.ownerId !== session.sub || lock.ownerToken !== lockToken) {
      return noStoreJson({ error: "lock_invalid" }, 409);
    }

    await prisma.courseEditLock.delete({ where: { courseId } });
    return noStoreJson({ success: true });
  } catch (err) {
    console.error("[api/course-details unlock]", courseId, err);
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

