import type { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import ProfissionalRepository from "../repository/ProfissionalRepository.js";
import ProfissionalService from "../services/profissionalService.js";

declare module "fastify" {
	interface FastifyInstance {
		profissionalService: ProfissionalService;
	}
}

const profissionalPlugin: FastifyPluginAsync = async (fastify) => {
	const profissionalRepository = new ProfissionalRepository(fastify.db);
	const profissionalService = new ProfissionalService(profissionalRepository);

	fastify.decorate("profissionalService", profissionalService);
};

export default fastifyPlugin(profissionalPlugin, {
	dependencies: ["dbConnector"],
});
