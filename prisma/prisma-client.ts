import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prismaClient = new PrismaClient();

export const prisma =
  globalForPrisma.prisma || prismaClient
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma