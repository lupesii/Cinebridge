import { ConflitoError } from "../domain/exceptions/ConflitoError.js";
import type Profissional from "../domain/Profissional.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace.js";
import type ProfissionalRepository from "../repository/ProfissionalRepository.js";

export default class ProfissionalService {
	constructor(private profissionalRepository: ProfissionalRepository) {}

	async createProfissional(profissional: Profissional) {
		try {
			const nome = await this.profissionalRepository.create(profissional);

			return nome;
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
