import { beforeEach, describe, expect, it, vi } from "vitest";
import type Projeto from "../../domain/Projeto.js";
import type { PrismaClient } from "../../generated/prisma/client.js";
import { Papel } from "../../models/papel.js";
import ProjetoRepository from "../../repository/ProjetoRepository.js";

function buildProjetoFake(): Projeto {
	return {
		id: "projeto-1",
		genero: "Animação",
		duracao: 45,
		orcamento: 20000,
		prazo: new Date("2027-01-01T00:00:00.000Z"),
		localizacao: "Belo Horizonte, MG",
		papeis: [
			{ papel: Papel.DIRETOR, peso: 5 },
			{ papel: Papel.EDITOR, peso: 3 },
		],
		equipe: null,
	} as Projeto;
}

describe("ProjetoRepository.create", () => {
	let prismaMock: PrismaClient;

	beforeEach(() => {
		prismaMock = {
			projeto: { create: vi.fn() },
		} as unknown as PrismaClient;
	});

	it("chama prisma.projeto.create com os campos e papéis mapeados corretamente", async () => {
		vi.mocked(prismaMock.projeto.create).mockResolvedValue({
			id: "projeto-1",
		} as never);
		const repository = new ProjetoRepository(prismaMock);
		const projeto = buildProjetoFake();

		await repository.create(projeto);

		expect(prismaMock.projeto.create).toHaveBeenCalledWith({
			data: {
				genero: projeto.genero,
				duracao: projeto.duracao,
				orcamento: projeto.orcamento,
				prazo: projeto.prazo,
				localizacao: projeto.localizacao,
				papeis: {
					createMany: {
						data: [
							{ papel: Papel.DIRETOR, peso: 5 },
							{ papel: Papel.EDITOR, peso: 3 },
						],
					},
				},
			},
		});
	});

	it("retorna o id do registro criado (não o objeto inteiro)", async () => {
		vi.mocked(prismaMock.projeto.create).mockResolvedValue({
			id: "projeto-gerado-1",
			genero: "Animação",
		} as never);
		const repository = new ProjetoRepository(prismaMock);

		const id = await repository.create(buildProjetoFake());

		expect(id).toBe("projeto-gerado-1");
		expect(typeof id).toBe("string");
	});

	it("propaga o erro caso o Prisma rejeite a criação", async () => {
		const erroDoPrisma = new Error("unique constraint violation");
		vi.mocked(prismaMock.projeto.create).mockRejectedValue(erroDoPrisma);
		const repository = new ProjetoRepository(prismaMock);

		await expect(repository.create(buildProjetoFake())).rejects.toBe(
			erroDoPrisma,
		);
	});
});
