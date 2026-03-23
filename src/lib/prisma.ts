import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
	// DATABASE_URL should be set in .env (e.g. "file:./dev.db"). The default
	// resolves to dev.db in the project root (CWD when Next.js runs), which is
	// also where `prisma migrate dev` writes the file with this configuration.
	const adapter = new PrismaBetterSqlite3({
		url: process.env.DATABASE_URL ?? "file:./dev.db",
	});
	return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
