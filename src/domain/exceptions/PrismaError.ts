export class PrismaError extends Error {
	readonly typeError: string;
	readonly codeError: string;
	readonly responseStatusCode: number;

	constructor(
		message: string,
		responseStatusCode: number,
		codeError: string,
		typeError: string,
		cause?: unknown,
	) {
		super(message, { cause });
		this.responseStatusCode = responseStatusCode;
		this.typeError = typeError;
		this.message = message;
		this.codeError = codeError;
	}
}
