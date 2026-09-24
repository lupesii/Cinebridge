export default class Competencia {
	constructor(
		private nome: string,
		private nivel: number,
		private _profissionalId: string,
	) {
		this.nome = nome;
		this.nivel = nivel;
	}

	get profissionalId() {
		return this._profissionalId;
	}

	set profissionalId(id: string) {
		this._profissionalId = id;
	}
}
