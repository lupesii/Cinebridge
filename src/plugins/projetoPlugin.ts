import type { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import ProjetoRepository from "../repository/ProjetoRepository.js";
import ProjetoService from "../services/ProjetoService.js";

declare module "fastify" {
	interface FastifyInstance {
		projetoService: ProjetoService;
	}
}

const projetoPlugin: FastifyPluginAsync = async (fastify) => {
	const projetoRepository = new ProjetoRepository(fastify.db);
	const projetoService = new ProjetoService(projetoRepository);

	fastify.decorate("projetoService", projetoService);
};

export default fastifyPlugin(projetoPlugin, {
	dependencies: ["dbConnector"],
});
