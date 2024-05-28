import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: typeof global & {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
};

const prisma = prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
