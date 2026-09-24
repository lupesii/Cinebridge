export default class ProjetoInvalidoException extends Error {
	readonly errorName: string;

	constructor(
		message: string,
		readonly statusCode: number,
	) {
		super(message);
		this.errorName = "Projeto possui atributos que vão contras as regras";
		this.statusCode = statusCode;
	}
}
