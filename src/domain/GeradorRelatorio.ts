import type VisitanteProjeto from "../interfaces/VisitanteProjeto.js";
import type Profissional from "./Profissional.js";
import type Projeto from "./Projeto.js";

export default class GeradorRelatorio implements VisitanteProjeto {
	visitarProjeto(projeto: Projeto): string {
		throw new Error("Method not implemented.");
	}
	visitarProfissional(profissional: Profissional): string {
		throw new Error("Method not implemented.");
	}
}
