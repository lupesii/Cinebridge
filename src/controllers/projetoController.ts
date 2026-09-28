import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { v4 as uuid } from "uuid";
import Projeto from "../domain/Projeto.js";
import { PostProjetoDTOSchema } from "../models/ProjetoDTO.js";

export const projetoController: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post(
		"/",
		{ schema: { body: PostProjetoDTOSchema } },
		async (request, reply) => {
			const body = request.body;

			const projeto = new Projeto(
				uuid(),
				body.genero,
				body.duracao,
				body.orcamento,
				body.prazo,
				body.localizacao,
				body.papeis,
			);

			const id = await fastify.projetoService.createProjeto(projeto);

			return reply
				.status(201)
				.send({ message: `Projeto ${id} foi criado com sucesso` });
		},
	);
};
