import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;
  if (!url) throw new Error("DATABASE_URL is not set");
  const adapter = new PrismaLibSql({ url, authToken: authToken || undefined });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

let _prisma: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!_prisma) {
    const g = globalThis as unknown as { _crmPrisma?: PrismaClient };
    _prisma = g._crmPrisma ?? createPrismaClient();
    if (process.env.NODE_ENV !== "production") g._crmPrisma = _prisma;
  }
  return _prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
