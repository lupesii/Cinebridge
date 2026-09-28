import { ConflitoError } from "../domain/exceptions/ConflitoError.js";
import type Projeto from "../domain/Projeto.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";
import type { IProjetoRepository } from "../interfaces/IProjetoRepository.js";

export default class ProjetoService {
	constructor(private projetoRepository: IProjetoRepository) {}

	async createProjeto(projeto: Projeto) {
		try {
			const id = await this.projetoRepository.create(projeto);
			return id;
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				throw new ConflitoError(
					"Já existe um projeto com esses dados.",
					error.cause,
				);
			}

			throw error;
		}
	}
}
