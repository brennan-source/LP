import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) throw new Error("DATABASE_URL is not set");

  // Local sqlite file — used in dev
  if (url.startsWith("file:")) {
    const adapter = new PrismaLibSql({ url: `libsql+${url}` });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
  }

  // Turso / remote libsql
  const adapter = new PrismaLibSql({ url, authToken });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

const globalForPrisma = globalThis as unknown as { prismAria: PrismaClient };

export const prisma = globalForPrisma.prismAria ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismAria = prisma;
