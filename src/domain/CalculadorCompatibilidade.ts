import type VisitanteProjeto from "../interfaces/VisitanteProjeto.js";
import type Profissional from "./Profissional.js";
import type Projeto from "./Projeto.js";

export default class CalculadorCompatibilidade implements VisitanteProjeto {
	visitarProjeto(projeto: Projeto): number {
		throw new Error("Method not implemented.");
	}
	visitarProfissional(profissional: Profissional): number {
		throw new Error("Method not implemented.");
	}
}
