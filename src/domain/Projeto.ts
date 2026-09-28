import type { PapelObrigatorio } from "../interfaces/PapelObrigatorio.js";
import type { Papel } from "../models/papel.js";
import type { tipoCaptacao } from "../models/tipoCaptacao.js";
import type Equipe from "./Equipe.js";
import type Profissional from "./Profissional.js";

export default class Projeto {
	private _equipe: Equipe | null;

	constructor(
		readonly id: string,
		readonly genero: string,
		readonly duracao: number,
		readonly orcamento: number,
		readonly prazo: Date,
		//	private tipoCaptacao: tipoCaptacao,
		readonly localizacao: string,
		readonly papeis: PapelObrigatorio[],
	) {
		this.id = id;
		this.genero = genero;
		this.duracao = duracao;
		this.orcamento = orcamento;
		this.prazo = prazo;
		// this.tipoCaptacao = tipoCaptacao;
		this.localizacao = localizacao;
		this.papeis = papeis;
		this._equipe = null;
	}

	aceitarRecomentacao(papel: Papel, profissional: Profissional) {}

	substituirMembro(papel: Papel, profissional: Profissional) {}

	soliciarReavaliacao() {}

	get equipe(): Equipe | null {
		return this._equipe;
	}

	set equipe(equipe: Equipe | null) {
		this._equipe = equipe;
		if (equipe !== null) {
			equipe.projetoId = this.id;
		}
	}
}
