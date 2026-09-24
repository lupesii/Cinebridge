import type Avaliacao from "./Avaliacao.js";
import type Competencia from "./Competencia.js";

export default class Profissional {
	constructor(
		private id: string,
		private nome: string,
		private disponibilidade_inicio: string,
		private disponibilidade_fim: string,
		private precoMedio: number,
		private _competencias: Competencia[],
		private _avaliacoes: Avaliacao[],
	) {
		this.id = id;
		this.nome = nome;
		this.disponibilidade_inicio = disponibilidade_inicio;
		this.disponibilidade_fim = disponibilidade_fim;
		this.precoMedio = precoMedio;
		this._competencias = _competencias ?? [];
		this._avaliacoes = _avaliacoes ?? [];
	}

	get avaliacoes(): Avaliacao[] {
		return this._avaliacoes;
	}

	set avaliacoes(avaliacao: Avaliacao) {
		avaliacao.profissionalId = this.id;
		this._avaliacoes.push(avaliacao);
	}

	get competencias(): Avaliacao[] {
		return this._avaliacoes;
	}

	set competencias(competencia: Competencia) {
		competencia.profissionalId = this.id;
		this._competencias.push(competencia);
	}
}
