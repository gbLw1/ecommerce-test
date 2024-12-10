import { ClienteCategoria } from "../../enums/cliente-categoria.enum";

export interface ClienteModel {
  clienteId: string;
  nome: string;
  cpf: string;
  categoria: ClienteCategoria;
}
