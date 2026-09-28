import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConflitoError } from "../../domain/exceptions/ConflitoError.js";
import type Projeto from "../../domain/Projeto.js";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace.js";
import type { IProjetoRepository } from "../../interfaces/IProjetoRepository.js";
import { Papel } from "../../models/papel.js";
import ProjetoService from "../ProjetoService.js";

function buildProjetoFake(): Projeto {
	return {
		id: "projeto-1",
		genero: "Ficção",
		duracao: 90,
		orcamento: 100000,
		prazo: new Date(Date.now() + 86_400_000),
		localizacao: "Rio de Janeiro, RJ",
		papeis: [{ papel: Papel.DIRETOR, peso: 5 }],
		equipe: null,
	} as Projeto;
}

describe("ProjetoService.createProjeto", () => {
	let repositoryMock: IProjetoRepository;

	beforeEach(() => {
		repositoryMock = { create: vi.fn() };
	});

	it("retorna o id devolvido pelo repositório quando a criação é bem-sucedida", async () => {
		vi.mocked(repositoryMock.create).mockResolvedValue("projeto-1");
		const service = new ProjetoService(repositoryMock);

		const id = await service.createProjeto(buildProjetoFake());

		expect(id).toBe("projeto-1");
		expect(repositoryMock.create).toHaveBeenCalledTimes(1);
	});

	it("traduz PrismaClientKnownRequestError com código P2002 em ConflitoError", async () => {
		const erroDeUnicidade = new PrismaClientKnownRequestError(
			"Unique constraint failed on the fields: (`genero`)",
			{ code: "P2002", clientVersion: "5.19.0" },
		);
		vi.mocked(repositoryMock.create).mockRejectedValue(erroDeUnicidade);
		const service = new ProjetoService(repositoryMock);

		await expect(
			service.createProjeto(buildProjetoFake()),
		).rejects.toBeInstanceOf(ConflitoError);
	});

	it("NÃO traduz um PrismaClientKnownRequestError com outro código (ex: P2025) — repassa como está", async () => {
		const outroErroPrisma = new PrismaClientKnownRequestError(
			"Record to update not found.",
			{ code: "P2025", clientVersion: "5.19.0" },
		);
		vi.mocked(repositoryMock.create).mockRejectedValue(outroErroPrisma);
		const service = new ProjetoService(repositoryMock);

		await expect(service.createProjeto(buildProjetoFake())).rejects.toBe(
			outroErroPrisma,
		);
	});

	it("repassa (rethrow) qualquer erro não relacionado ao Prisma sem engolir", async () => {
		const erroInesperado = new Error("connection terminated unexpectedly");
		vi.mocked(repositoryMock.create).mockRejectedValue(erroInesperado);
		const service = new ProjetoService(repositoryMock);

		await expect(service.createProjeto(buildProjetoFake())).rejects.toBe(
			erroInesperado,
		);
	});
});
