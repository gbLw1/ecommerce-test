import { ClienteCategoria } from "../../enums/cliente-categoria.enum";

export interface ClientePostArgs {
  clienteId: string;
  nome: string;
  cpf: string;
  categoria: ClienteCategoria;
}
