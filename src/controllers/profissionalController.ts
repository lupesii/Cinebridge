import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const ProfissionalController: FastifyPluginAsyncZod = async (
	fastify,
	opts,
) => {
	fastify.post("/", () => {});
};
