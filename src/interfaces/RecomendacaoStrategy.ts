import type Profissional from "../domain/Profissional.js";
import type Projeto from "../domain/Projeto.js";
import type { Papel } from "../models/papel.js";

export interface RecomendacaoStrategy {
	recomendar(
		projeto: Projeto,
		profissionais: Profissional[],
	): Map<Papel, Profissional[]>;
}
