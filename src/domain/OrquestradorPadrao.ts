import type { Papel } from "../models/papel.js";
import ProjetoInvalidoException from "./exceptions/ProjetoInvalidoError.js";
import OrquestradorEquipe from "./OrquestradorEquipe.js";
import type Profissional from "./Profissional.js";
import type Projeto from "./Projeto.js";

export default class OrquestradorPadrao extends OrquestradorEquipe {
	protected validarRestricoes(projeto: Projeto) {
		if (projeto.orcamento <= 0)
			throw new ProjetoInvalidoException(
				"Orçamento não pode ser 0 nem negativo",
			);

		if (projeto.prazo.getTime() < Date.now())
			throw new ProjetoInvalidoException(
				"O prazo final não pode ser anterior a hoje",
			);

		const duracaoMilisegundos = projeto.duracao * 60000;
		if (projeto.prazo.getTime() < Date.now() + duracaoMilisegundos)
			throw new ProjetoInvalidoException(
				"O prazo final não pode ser concluido levando em conta o tempo de duração do projeto",
			);

		if (projeto.papeis.length === 0)
			throw new ProjetoInvalidoException(
				"Não há nenhum papel necessário no projeto",
			);
	}
	protected normalizarDados(
		projeto: Projeto,
		profissionais: Profissional[],
	): Profissional[] {
		throw new Error("Method not implemented.");
	}
	protected posProcessar(
		recomendacoes: Map<Papel, Profissional[]>,
	): Map<Papel, Profissional[]> {
		throw new Error("Method not implemented.");
	}
}
