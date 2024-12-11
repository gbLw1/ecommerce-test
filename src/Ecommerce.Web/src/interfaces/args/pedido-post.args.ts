import { ClientePostArgs } from "./cliente-post.args";
import { PedidoItemArgs } from "./pedido-item.args";

export interface PedidoPostArgs {
  identificador: string;
  dataVenda: string;
  cliente: ClientePostArgs;
  itens: PedidoItemArgs[];
}
