const COOKIE_NAME = "slab-session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

function getSecret(): string {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!secret) throw new Error("DASHBOARD_SESSION_SECRET is not set");
  return secret;
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = getSecret();
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): ArrayBuffer {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer as ArrayBuffer;
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = JSON.stringify({
    sub: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  });

  const encoder = new TextEncoder();
  const payloadB64 = toBase64Url(encoder.encode(payload).buffer as ArrayBuffer);

  const key = await getSigningKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadB64)
  );

  return `${payloadB64}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const [payloadB64, signatureB64] = token.split(".");
    if (!payloadB64 || !signatureB64) return null;

    const key = await getSigningKey();
    const encoder = new TextEncoder();
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signatureB64),
      encoder.encode(payloadB64)
    );
    if (!isValid) return null;

    const payloadBytes = fromBase64Url(payloadB64);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return { sub: payload.sub };
  } catch {
    return null;
  }
}

export function buildSessionCookie(token: string): string {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    `HttpOnly`,
    `Path=/`,
    `SameSite=Lax`,
    `Max-Age=${SESSION_MAX_AGE}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`;
}

export { COOKIE_NAME };
