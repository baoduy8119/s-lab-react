import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";
import { verifySessionToken, COOKIE_NAME } from "@/app/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID_KEYS = ["homepage", "courses", "courseDetails", "slibrary", "the-s-lab", "footer"];

function computeEtag(updatedAt: Date): string {
  // Weak ETag derived from DB `updatedAt`.
  return `W/"${updatedAt.getTime()}"`;
}

const noStoreJson = (body: unknown, status = 200, extraHeaders?: Record<string, string>) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0, must-revalidate",
      ...(extraHeaders ?? {}),
    },
  });

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  if (!VALID_KEYS.includes(key)) {
    return noStoreJson({ error: "Invalid key" }, 400);
  }

  try {
    const prisma = getPrisma();
    const row = await prisma.siteContent.findUnique({
      where: { key },
      select: { data: true, updatedAt: true },
    });

    if (!row) {
      return noStoreJson({ data: null });
    }

    return noStoreJson({ data: JSON.parse(row.data) }, 200, { ETag: computeEtag(row.updatedAt) });
  } catch (err) {
    console.error("[api/content GET]", key, err);
    const message = err instanceof Error ? err.message : String(err);
    const showDetail = process.env.VERCEL_ENV !== "production";
    return noStoreJson(
      {
        error: "database_unavailable",
        hint:
          "Vercel: enable Postgres env for Preview + Production; prefer POSTGRES_PRISMA_URL / store_PRISMA_DATABASE_URL. Redeploy after changes.",
        ...(showDetail ? { detail: message.slice(0, 500) } : {}),
      },
      503
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;

  if (!VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const body = await request.json();
  const data = body.data;

  if (data === undefined) {
    return NextResponse.json({ error: "Missing data field" }, { status: 400 });
  }

  try {
    const prisma = getPrisma();
    const existing = await prisma.siteContent.findUnique({
      where: { key },
      select: { data: true, updatedAt: true },
    });

    // Optimistic concurrency: require If-Match when overwriting existing data.
    if (existing) {
      const ifMatch = request.headers.get("if-match");
      if (!ifMatch) {
        return noStoreJson(
          { error: "precondition_required", hint: "Missing If-Match header" },
          428,
          { ETag: computeEtag(existing.updatedAt) }
        );
      }
      const currentEtag = computeEtag(existing.updatedAt);
      if (ifMatch !== currentEtag) {
        return noStoreJson(
          {
            error: "conflict",
            hint: "Content was updated elsewhere. Reload before saving again.",
            data: JSON.parse(existing.data),
          },
          409,
          { ETag: currentEtag }
        );
      }
    }

    const saved = await prisma.siteContent.upsert({
      where: { key },
      create: { key, data: JSON.stringify(data) },
      update: { data: JSON.stringify(data) },
      select: { updatedAt: true },
    });

    return noStoreJson({ success: true }, 200, { ETag: computeEtag(saved.updatedAt) });
  } catch (err) {
    console.error("[api/content PUT]", key, err);
    const message = err instanceof Error ? err.message : String(err);
    const showDetail = process.env.VERCEL_ENV !== "production";
    return NextResponse.json(
      {
        error: "database_unavailable",
        hint:
          "Vercel: ensure DATABASE_URL or POSTGRES_PRISMA_URL is set for this deployment environment.",
        ...(showDetail ? { detail: message.slice(0, 500) } : {}),
      },
      { status: 503 }
    );
  }
}
