export default class Avaliacao {
	constructor(
		readonly nota: number,
		readonly comentario: string,
		readonly data: Date,
		private _profissionalId: string,
	) {
		this.nota = nota;
		this.comentario = comentario;
		this.data = data;
		this._profissionalId = _profissionalId;
	}

	get profissionalId() {
		return this._profissionalId;
	}

	set profissionalId(id: string) {
		this._profissionalId = id;
	}
}
