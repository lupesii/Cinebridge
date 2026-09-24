import type VisitanteProjeto from "../interfaces/VisitanteProjeto.js";
import type Profissional from "./Profissional.js";
import type Projeto from "./Projeto.js";

export default class ValidadorConsistencia implements VisitanteProjeto {
	visitarProjeto(projeto: Projeto): boolean {
		throw new Error("Method not implemented.");
	}
	visitarProfissional(profissional: Profissional): boolean {
		throw new Error("Method not implemented.");
	}
}
