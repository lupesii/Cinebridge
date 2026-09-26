export class PrismaError extends Error {
	constructor(
		message: string,
		readonly typeError: string,
		readonly codeError: string,
	) {
		super(message);
		this.typeError = typeError;
		this.codeError = codeError;
	}
}
