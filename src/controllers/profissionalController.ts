import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { v4 as uuid } from "uuid";
import Avaliacao from "../domain/Avaliacao.js";
import Competencia from "../domain/Competencia.js";
import Profissional from "../domain/Profissional.js";
import { PostProfissionalDTOSchema } from "../models/ProfissionalDTO.js";

export const ProfissionalController: FastifyPluginAsyncZod = async (
	fastify,
	opts,
) => {
	fastify.post(
		"/",
		{ schema: { body: PostProfissionalDTOSchema } },
		(request, reply) => {
			const body = request.body;

			const profissionalId = uuid();
			const competencias = body.competencias.map(
				(c) => new Competencia(c.nome, c.nivel, profissionalId),
			);
			const avaliacoes = body.avaliacoes.map(
				(a) => new Avaliacao(a.nota, a.comentario, a.data, profissionalId),
			);

			const profissional = new Profissional(
				profissionalId,
				body.nome,
				body.disponibilidade_inicio,
				body.disponibilidade_fim,
				body.precoMedio,
				competencias,
				avaliacoes,
			);

			const nome = fastify.profissionalService.createProfissional(profissional);

			return reply
				.send({
					message: `Profissional ${nome} foi criado`,
				})
				.code(201);
		},
	);
};
