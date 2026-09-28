import type Projeto from "../domain/Projeto.js";
import type { PrismaClient } from "../generated/prisma/client.js";

export default class ProjetoRepository {
	constructor(private prisma: PrismaClient) {}

	async create(projeto: Projeto) {
		const createProjeto = await this.prisma.projeto.create({
			data: {
				genero: projeto.genero,
				duracao: projeto.duracao,
				orcamento: projeto.orcamento,
				prazo: projeto.prazo,
				localizacao: projeto.localizacao,
				papeis: {
					createMany: {
						data: projeto.papeis.map((p) => ({
							papel: p.papel,
							peso: p.peso,
						})),
					},
				},
			},
		});

		return createProjeto.id;
	}
}
