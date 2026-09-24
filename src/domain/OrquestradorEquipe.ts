import type { RecomendacaoStrategy } from "../interfaces/RecomendacaoStrategy.js";
import type { Papel } from "../models/papel.js";
import type Equipe from "./Equipe.js";
import type Profissional from "./Profissional.js";
import type Projeto from "./Projeto.js";

export default abstract class OrquestradorEquipe {
	public orquestrar(
		projeto: Projeto,
		profissionaisDisponiveis: Profissional[],
		estrategia: RecomendacaoStrategy,
	): Equipe {
		const profissionaisNormalizados = this.normalizarDados(
			projeto,
			profissionaisDisponiveis,
		);

		const recomendacoes = estrategia.recomendar(
			projeto,
			profissionaisNormalizados,
		);

		const recomendacoesFinais = this.posProcessar(recomendacoes);

		return this.montarEquipe(projeto, recomendacoesFinais);
	}

	protected abstract validarRestricoes(projeto: Projeto): void;

	protected abstract normalizarDados(
		projeto: Projeto,
		profissionais: Profissional[],
	): Profissional[];

	protected abstract posProcessar(
		recomendacoes: Map<Papel, Profissional[]>,
	): Map<Papel, Profissional[]>;

	private montarEquipe(
		projeto: Projeto,
		recomendacoes: Map<Papel, Profissional[]>,
	): Equipe {
		throw new Error("a implementar");
	}
}
