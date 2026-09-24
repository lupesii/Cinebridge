import type { Papel } from "../models/papel.js";
import type Profissional from "./Profissional.js";

export default class MembroEquipe {
	constructor(
		private papel: Papel,
		private confirmado: boolean,
		private _equipeId: string,
		private _profissional: Profissional,
	) {
		this.papel = papel;
		this.confirmado = confirmado;
	}

	get equipeId() {
		return this._equipeId;
	}

	set equipeId(id: string) {
		this._equipeId = id;
	}

	get profissional() {
		return this._profissional;
	}

	set profissional(profissional: Profissional) {
		this._profissional = profissional;
	}
}
