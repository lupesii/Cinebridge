import type Profissional from "../domain/Profissional.js";
import type Projeto from "../domain/Projeto.js";

export default interface VisitanteProjeto {
	visitarProjeto(projeto: Projeto): any;
	visitarProfissional(profissional: Profissional): any;
}
