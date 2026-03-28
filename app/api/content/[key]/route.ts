import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/app/lib/prisma";
import { verifySessionToken, COOKIE_NAME } from "@/app/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const VALID_KEYS = ["homepage", "courses", "slibrary", "the-s-lab", "footer"];

const noStoreJson = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0, must-revalidate",
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
    const row = await prisma.siteContent.findUnique({ where: { key } });

    if (!row) {
      return noStoreJson({ data: null });
    }

    return noStoreJson({ data: JSON.parse(row.data) });
  } catch (err) {
    console.error("[api/content GET]", key, err);
    return noStoreJson(
      {
        error: "database_unavailable",
        hint:
          "Vercel: add the same Postgres env vars for Preview as for Production (DATABASE_URL or store_* / POSTGRES_PRISMA_URL), then redeploy.",
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
    await prisma.siteContent.upsert({
      where: { key },
      create: { key, data: JSON.stringify(data) },
      update: { data: JSON.stringify(data) },
    });
  } catch (err) {
    console.error("[api/content PUT]", key, err);
    return NextResponse.json(
      {
        error: "database_unavailable",
        hint:
          "Vercel: ensure DATABASE_URL (or integration Postgres vars) is set for this environment.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true });
}
