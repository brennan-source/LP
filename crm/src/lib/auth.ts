import crypto from "crypto";

const SECRET = process.env.CRM_SECRET ?? "dev-secret-change-me";
export const COOKIE_NAME = "crm_session";

export function createSessionToken(): string {
  const payload = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function validateSessionToken(token: string): boolean {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const payload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  if (!payload || !sig) return false;
  const expected = hmac(payload);
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

export function checkPassword(password: string): boolean {
  const expected = process.env.CRM_PASSWORD;
  if (!expected) return false;
  try {
    if (password.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}
