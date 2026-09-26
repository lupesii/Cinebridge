import { array, coerce, number, object, string } from "zod";

export const PostProfissionalDTOSchema = object({
	nome: string(),
	disponibilidade_inicio: string(),
	disponibilidade_fim: string(),
	precoMedio: number().positive(),
	competencias: array(
		object({
			nome: string(),
			nivel: number().positive().max(5),
		}),
	),
	avaliacoes: array(
		object({
			nota: number().positive().max(10),
			comentario: string(),
			data: coerce.date(),
		}),
	),
});
