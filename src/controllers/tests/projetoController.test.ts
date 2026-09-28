import Fastify, { type FastifyError } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { projetoController } from "../../controllers/projetoController.js";
import { ConflitoError } from "../../domain/exceptions/ConflitoError.js";
import { GenericError } from "../../domain/exceptions/GenericError.js";
import { Papel } from "../../models/papel.js";

function buildTestApp(projetoServiceMock: {
	createProjeto: ReturnType<typeof vi.fn>;
}) {
	const fastify = Fastify().withTypeProvider<ZodTypeProvider>();
	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);

	fastify.decorate("projetoService", projetoServiceMock);

	fastify.setErrorHandler((error: FastifyError, _request, reply) => {
		if (error.code === "FST_ERR_VALIDATION") {
			return reply.status(400).send({
				error: "ERRO_VALIDACAO",
				message: "O corpo da requisição não atende ao formato esperado",
			});
		}

		if (error instanceof GenericError) {
			return reply.status(error.statusCode).send({
				error: error.code,
				message: error.message,
			});
		}

		return reply.status(500).send({
			error: "ERRO_INTERNO",
			message: "Ocorreu um erro interno inesperado",
		});
	});

	fastify.register(projetoController, { prefix: "/projeto" });

	return fastify;
}

// Payload válido: prazo 3h no futuro é suficiente pra passar na regra
// `prazo >= agora + duracao (min) * 60000`, já que duracao aqui é pequena.
const payloadValido = {
	genero: "Documentário",
	duracao: 60,
	orcamento: 50000,
	prazo: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
	localizacao: "São Paulo, SP",
	papeis: [{ papel: Papel.DIRETOR, peso: 5 }],
};

describe("POST /projeto", () => {
	let projetoServiceMock: { createProjeto: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		projetoServiceMock = { createProjeto: vi.fn() };
	});

	it("retorna 201 e a mensagem de sucesso quando o projeto é criado", async () => {
		projetoServiceMock.createProjeto.mockResolvedValue("uuid-123");
		const app = buildTestApp(projetoServiceMock);

		const response = await app.inject({
			method: "POST",
			url: "/projeto",
			payload: payloadValido,
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual({
			message: "Projeto uuid-123 foi criado com sucesso",
		});
	});

	it("chama o service com um Projeto contendo os dados enviados", async () => {
		projetoServiceMock.createProjeto.mockResolvedValue("uuid-123");
		const app = buildTestApp(projetoServiceMock);

		await app.inject({
			method: "POST",
			url: "/projeto",
			payload: payloadValido,
		});

		expect(projetoServiceMock.createProjeto).toHaveBeenCalledTimes(1);
		expect(projetoServiceMock.createProjeto).toHaveBeenCalledWith(
			expect.objectContaining({
				genero: payloadValido.genero,
				duracao: payloadValido.duracao,
				orcamento: payloadValido.orcamento,
				localizacao: payloadValido.localizacao,
				papeis: payloadValido.papeis,
			}),
		);
	});

	it("retorna 400 quando 'papel' não é um valor válido do enum Papel", async () => {
		const app = buildTestApp(projetoServiceMock);

		const response = await app.inject({
			method: "POST",
			url: "/projeto",
			payload: {
				...payloadValido,
				papeis: [{ papel: "PADEIRO", peso: 5 }],
			},
		});

		expect(response.statusCode).toBe(400);
		expect(projetoServiceMock.createProjeto).not.toHaveBeenCalled();
	});

	it("retorna 400 quando o prazo é incompatível com a duração informada", async () => {
		const app = buildTestApp(projetoServiceMock);

		const response = await app.inject({
			method: "POST",
			url: "/projeto",
			payload: {
				...payloadValido,
				duracao: 999999, // duração enorme torna o prazo (3h no futuro) inviável
			},
		});

		expect(response.statusCode).toBe(400);
		expect(projetoServiceMock.createProjeto).not.toHaveBeenCalled();
	});

	it("retorna 409 quando o service lança ConflitoError", async () => {
		projetoServiceMock.createProjeto.mockRejectedValue(
			new ConflitoError("Já existe um projeto com esses dados."),
		);
		const app = buildTestApp(projetoServiceMock);

		const response = await app.inject({
			method: "POST",
			url: "/projeto",
			payload: payloadValido,
		});

		expect(response.statusCode).toBe(409);
		expect(response.json()).toMatchObject({
			error: "CONFLITO",
			message: "Já existe um projeto com esses dados.",
		});
	});

	it("retorna 500 e esconde o detalhe interno quando o erro não é mapeado", async () => {
		projetoServiceMock.createProjeto.mockRejectedValue(
			new Error("connection terminated unexpectedly"),
		);
		const app = buildTestApp(projetoServiceMock);

		const response = await app.inject({
			method: "POST",
			url: "/projeto",
			payload: payloadValido,
		});

		expect(response.statusCode).toBe(500);
		const body = response.json();
		expect(body.error).toBe("ERRO_INTERNO");
		// Garante que o detalhe técnico do erro real NUNCA vaza pro cliente.
		expect(JSON.stringify(body)).not.toContain("connection terminated");
	});
});
