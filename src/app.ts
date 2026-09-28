import { fastifyCors } from "@fastify/cors";
import Fastify, { type FastifyError } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { profissionalController } from "./controllers/profissionalController.js";
import { projetoController } from "./controllers/projetoController.js";
import { ConflitoError } from "./domain/exceptions/ConflitoError.js";
import { GenericError } from "./domain/exceptions/GenericError.js";
import ProjetoInvalidoException from "./domain/exceptions/ProjetoInvalidoError.js";
import { dbPlugin } from "./plugins/db-connector.js";
import profissionalPlugin from "./plugins/profissionalPlugin.js";
import projetoPlugin from "./plugins/projetoPlugin.js";

export default async function buildServer(options = {}) {
	const fastify = Fastify(options).withTypeProvider<ZodTypeProvider>();
	fastify.setSerializerCompiler(serializerCompiler);
	fastify.setValidatorCompiler(validatorCompiler);

	fastify.setErrorHandler(function (error: FastifyError, request, reply) {
		if (error.code === "FST_ERR_VALIDATION")
			return reply.status(400).send({
				error: "ERRO_VALIDACAO",
				message: "O corpo da requisição não atende ao formato esperado",
				details: error.validation,
			});

		if (
			error instanceof GenericError ||
			error instanceof ProjetoInvalidoException ||
			error instanceof ConflitoError
		) {
			request.log.warn({ err: error, code: error.code }, "erro operacional");
			return reply.status(error.statusCode).send({
				error: error.code,
				message: error.message,
				details: error.details,
			});
		}

		this.log.error({ err: error }, "Erro não tradado");
		reply.status(error.statusCode || 500).send({
			error: "ERRO_INTERNO",
			message: "Ocorreu um erro interno inesperado",
		});
	});

	fastify.get("/health", async (_request, reply) => {
		return reply.send({ status: "ok" });
	});

	await fastify.register(fastifyCors, {
		origin: "*",
	});
	await fastify.register(dbPlugin);
	await fastify.register(profissionalPlugin);
	await fastify.register(projetoPlugin);

	//controllers
	await fastify.register(profissionalController, {
		prefix: "/profissional",
	});
	await fastify.register(projetoController, {
		prefix: "/projeto",
	});

	return fastify;
}
