import { NextResponse } from "next/server";
import { buildClearCookie } from "@/app/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", buildClearCookie());
  return response;
}
