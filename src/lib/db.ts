import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";
  // PrismaLibSql accepts the libsql connection config directly
  const adapter = new PrismaLibSql({ url: dbUrl });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
