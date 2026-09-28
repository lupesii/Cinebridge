import { GenericError } from "./GenericError.js";

export class ConflitoError extends GenericError {
	readonly statusCode = 409;
	readonly code = "CONFLITO";
}
