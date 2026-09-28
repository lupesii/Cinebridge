import { GenericError } from "./GenericError.js";

export default class ConnectionError extends GenericError {
	readonly statusCode = 500;
	readonly code = "CONNECTION_WITH_DATABASE";
}
