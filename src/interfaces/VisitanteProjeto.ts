import type Profissional from "../Profissional.js";
import type Projeto from "../Projeto.js";

export default interface VisitanteProjeto {
	visitarProjeto(projeto: Projeto): any;
	visitarProfissional(profissional: Profissional): any;
}
