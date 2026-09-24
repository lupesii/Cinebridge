import { PrismaPg } from "@prisma/adapter-pg";
import type { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { env } from "../env.js";
import { PrismaClient } from "../generated/prisma/client.js";

declare module "fastify" {
	interface FastifyInstance {
		db: PrismaClient;
	}
}

const dbConnector = async (fastify: FastifyInstance) => {
	const adapter = new PrismaPg({
		connectionString: env.DATABASE_URL,
	});

	if (!adapter) throw new Error("Adapter não criado");
	const db = new PrismaClient({ adapter });

	fastify.decorate("db", db);

	fastify.addHook("onClose", async function () {
		await this.db.$disconnect();
	});
};

export default fastifyPlugin(dbConnector);
