import type Projeto from "../domain/Projeto.js";

export interface IProjetoRepository {
	create(projeto: Projeto): Promise<string>;
}
