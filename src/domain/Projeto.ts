import type { PapelObrigatorio } from "../interfaces/PapelObrigatorio.js";
import type { Papel } from "../models/papel.js";
import type { tipoCaptacao } from "../models/tipoCaptacao.js";
import type Equipe from "./Equipe.js";
import type Profissional from "./Profissional.js";

export default class Projeto {
	constructor(
		readonly id: string,
		public genero: string,
		public duracao: number,
		public orcamento: number,
		public prazo: Date,
		//	private tipoCaptacao: tipoCaptacao,
		public localizacao: string,
		public papeis: PapelObrigatorio[],
		private _equipe: Equipe,
	) {
		this.id = id;
		this.genero = genero;
		this.duracao = duracao;
		this.prazo = prazo;
		// this.tipoCaptacao = tipoCaptacao;
		this.localizacao = localizacao;
		this.papeis = papeis;
		this._equipe = _equipe;
	}

	aceitarRecomentacao(papel: Papel, profissional: Profissional) {}

	substituirMembro(papel: Papel, profissional: Profissional) {}

	soliciarReavaliacao() {}

	get equipe() {
		return this._equipe;
	}

	set equipe(equipe: Equipe) {
		this._equipe = equipe;
		equipe.projetoId = this.id;
	}
}
