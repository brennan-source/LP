import { createHmac } from "crypto";

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

export { COOKIE_NAME };
