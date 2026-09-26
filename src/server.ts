import buildServer from "./app.js";
import { PrismaError } from "./domain/exceptions/PrismaError.js";
import { env } from "./env.js";
import { PrismaClientKnownRequestError } from "./generated/prisma/internal/prismaNamespace.js";

const PORT = env.SERVER_PORT || 3000;

const startServer = async () => {
	const server = await buildServer();

	try {
		await server.db.$queryRaw`SELECT 1`;
		await server.listen({ port: PORT, host: "0.0.0.0" });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new PrismaError(
				"Não foi possivel conectar ao banco",
				"Query Error",
				error.code,
			);
		}
		server.log.debug(error);
		process.exit(1);
	}
};

startServer();
