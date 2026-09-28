import type Profissional from "../domain/Profissional.js";
import type { PrismaClient } from "../generated/prisma/client.js";

export default class ProfissionalRepository {
	constructor(private prisma: PrismaClient) {}

	async create(profissional: Profissional) {
		const createProfissional = await this.prisma.profissional.create({
			data: {
				id: profissional.id,
				nome: profissional.nome,
				disponibilidade_inicio: profissional.disponibilidade_inicio,
				disponibilidade_fim: profissional.disponibilidade_fim,
				precoMedio: profissional.precoMedio,
				competencias: {
					createMany: {
						data: profissional.competencias.map((c) => ({
							nome: c.nome,
							nivel: c.nivel,
						})),
					},
				},
				avaliacoes: {
					createMany: {
						data: profissional.avaliacoes.map((a) => ({
							nota: a.nota,
							comentario: a.comentario,
							data: a.data,
						})),
					},
				},
			},
		});

		return createProfissional.nome;
	}
}
