import { GenericError } from "./GenericError.js";

export default class ProjetoInvalidoException extends GenericError {
	readonly statusCode = 400;
	readonly code = "BAD_REQUEST";
}
