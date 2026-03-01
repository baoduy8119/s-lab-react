import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "slab-session";

async function getSigningKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
}

function fromBase64Url(str: string): ArrayBuffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer as ArrayBuffer;
}

async function isValidSession(token: string, secret: string): Promise<boolean> {
  try {
    const [payloadB64, signatureB64] = token.split(".");
    if (!payloadB64 || !signatureB64) return false;

    const key = await getSigningKey(secret);
    const encoder = new TextEncoder();
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signatureB64),
      encoder.encode(payloadB64)
    );
    if (!isValid) return false;

    const payloadBytes = fromBase64Url(payloadB64);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const secret = process.env.DASHBOARD_SESSION_SECRET;
    if (token && secret && (await isValidSession(token, secret))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.DASHBOARD_SESSION_SECRET;

  if (!token || !secret || !(await isValidSession(token, secret))) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
