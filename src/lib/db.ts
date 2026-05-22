import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;
  if (!url) throw new Error("DATABASE_URL is not set");
  const adapter = new PrismaLibSql(url.startsWith("file:") ? { url: `libsql+${url}` } : { url, authToken });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

// Lazy singleton — client is created on first access, not at module load time.
// This prevents build-time errors when DATABASE_URL is not set in the environment.
let _prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!_prisma) {
    const g = globalThis as unknown as { _lpPrisma?: PrismaClient };
    _prisma = g._lpPrisma ?? createPrismaClient();
    if (process.env.NODE_ENV !== "production") g._lpPrisma = _prisma;
  }
  return _prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
