export abstract class GenericError extends Error {
	abstract readonly statusCode: number;
	abstract readonly code: string;

	constructor(
		message: string,
		public readonly details?: unknown,
	) {
		super(message);
		this.name = new.target.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
