import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";
  const adapter = new PrismaLibSql({ url: dbUrl });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

const globalForPrisma = globalThis as unknown as { prismAria: PrismaClient };

export const prisma = globalForPrisma.prismAria ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismAria = prisma;
