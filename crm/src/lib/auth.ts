import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "crm_session";

function getSecret(): string {
  const secret = process.env.CRM_SECRET;
  if (!secret) throw new Error("CRM_SECRET is not set");
  return secret;
}

function getPassword(): string {
  const password = process.env.CRM_PASSWORD;
  if (!password) throw new Error("CRM_PASSWORD is not set");
  return password;
}

function signToken(payload: string): string {
  const secret = getSecret();
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return sig === expected;
}

export function checkPassword(input: string): boolean {
  return input === getPassword();
}

export function createSessionToken(): string {
  const payload = `crm_auth:${Date.now()}`;
  return signToken(payload);
}

export function validateSessionToken(token: string): boolean {
  return verifyToken(token);
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return validateSessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME };
