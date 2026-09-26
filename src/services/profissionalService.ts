import { PrismaError } from "../domain/exceptions/PrismaError.js";
import type Profissional from "../domain/Profissional.js";
import { PrismaClientValidationError } from "../generated/prisma/internal/prismaNamespace.js";
import type ProfissionalRepository from "../repository/ProfissionalRepository.js";

export default class ProfissionalService {
	constructor(private profissionalRepository: ProfissionalRepository) {}

	async createProfissional(profissional: Profissional) {
		try {
			const nome = await this.profissionalRepository.create(profissional);

			return nome;
		} catch (error) {
			if (error instanceof PrismaClientValidationError) {
				throw new PrismaError(
					"Erro ao cadastrar Profissional",
					error.name,
					"409",
				);
			}
		}
	}
}
