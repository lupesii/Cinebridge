import z, { array, coerce, number, object, string } from "zod";
import { Papel } from "./papel.js";

export const PostProjetoDTOSchema = object({
	genero: string(),
	duracao: number().positive(),
	orcamento: number().positive(),
	prazo: coerce.date(),
	localizacao: string(),
	papeis: array(
		object({
			papel: z.enum(Papel),
			peso: number(),
		}),
	),
}).check((ctx) => {
	const { prazo, duracao } = ctx.value;

	if (prazo.getTime() < Date.now() + duracao * 60000) {
		ctx.issues.push({
			code: "custom",
			message: "O prazo não é possível de ser feito",
			path: ["prazo"],
			input: Date,
		});
	}
});
