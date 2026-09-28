export default class Competencia {
	constructor(
		readonly nome: string,
		readonly nivel: number,
		private _profissionalId: string,
	) {
		this.nome = nome;
		this.nivel = nivel;
		this._profissionalId = _profissionalId;
	}

	get profissionalId() {
		return this._profissionalId;
	}

	set profissionalId(id: string) {
		this._profissionalId = id;
	}
}
