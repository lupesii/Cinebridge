import buildServer from "./app.js";
import ConnectionError from "./domain/exceptions/ConnectionError.js";
import { env } from "./env.js";
import { PrismaClientKnownRequestError } from "./generated/prisma/internal/prismaNamespace.js";

const PORT = env.SERVER_PORT || 3000;

const startServer = async () => {
	const server = await buildServer({ logger: true });

	try {
		await server.db.$queryRaw`SELECT 1`;
		await server.listen({ port: PORT, host: "0.0.0.0" });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			throw new ConnectionError(
				"Não foi possivel conectar ao banco",
				error.cause,
			);
		}
		server.log.debug(error);
		process.exit(1);
	}
};

startServer();
