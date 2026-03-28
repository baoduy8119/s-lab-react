import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifySessionToken, COOKIE_NAME } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

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

  const row = await prisma.siteContent.findUnique({ where: { key } });

  if (!row) {
    return noStoreJson({ data: null });
  }

  return noStoreJson({ data: JSON.parse(row.data) });
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

  await prisma.siteContent.upsert({
    where: { key },
    create: { key, data: JSON.stringify(data) },
    update: { data: JSON.stringify(data) },
  });

  return NextResponse.json({ success: true });
}
