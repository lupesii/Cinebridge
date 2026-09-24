import type MembroEquipe from "./MembroEquipe.js";

export default class Equipe {
	constructor(
		private id: string,
		private dataFormacao: Date,
		private status: string,
		private _projetoId: string,
		private _membrosEquipe: MembroEquipe[],
	) {
		this.id = id;
		this.dataFormacao = dataFormacao;
		this.status = status;
		this._membrosEquipe = _membrosEquipe ?? [];
	}

	get projetoId() {
		return this._projetoId;
	}

	set projetoId(id: string) {
		this._projetoId = id;
	}

	get membrosEquipe(): MembroEquipe[] {
		return this._membrosEquipe;
	}

	set membrosEquipe(membroEquipe: MembroEquipe) {
		membroEquipe.equipeId = this.id;
		this._membrosEquipe.push(membroEquipe);
	}
}
