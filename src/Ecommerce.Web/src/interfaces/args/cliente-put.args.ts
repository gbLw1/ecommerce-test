import { ClienteCategoria } from "../../enums/cliente-categoria.enum";

export interface ClientePutArgs {
  nome: string;
  cpf: string;
  categoria: ClienteCategoria;
}
