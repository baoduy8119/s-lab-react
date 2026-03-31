import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, buildSessionCookie } from "@/app/lib/auth";
import { timingSafeEqual } from "crypto";

function safeCompare(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  if (bufA.byteLength !== bufB.byteLength) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const validUsername = process.env.DASHBOARD_USERNAME;
    const validPassword = process.env.DASHBOARD_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const usernameMatch = safeCompare(username, validUsername);
    const passwordMatch = safeCompare(password, validPassword);

    if (!usernameMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(username);
    const cookie = buildSessionCookie(token);

    const response = NextResponse.json({ ok: true, username });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
