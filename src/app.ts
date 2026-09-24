import { fastifyCors } from "@fastify/cors";
import Fastify, { type FastifyError } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import dbConnector from "./plugins/db-connector.js";

export default async function buildServer(options = {}) {
	const fastify = Fastify(options).withTypeProvider<ZodTypeProvider>();
	fastify.setSerializerCompiler(serializerCompiler);
	fastify.setValidatorCompiler(validatorCompiler);

	fastify.setErrorHandler(function (error: FastifyError, request, reply) {
		if (error.validation || (error.statusCode && error.statusCode < 500)) {
			return reply.send(error);
		}

		this.log.error({ err: error }, "unhandled error");
		reply.status(500).send({
			statusCode: 500,
			error: "Internal Server Error",
			message: error.message,
		});
	});

	fastify.get("/health", async (_request, reply) => {
		return reply.send({ status: "ok" });
	});

	await fastify.register(fastifyCors, {
		origin: "*",
	});
	await fastify.register(dbConnector);

	return fastify;
}
