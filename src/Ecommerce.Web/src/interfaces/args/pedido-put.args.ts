import { ClientePutArgs } from "./cliente-put.args";
import { PedidoItemArgs } from "./pedido-item.args";

export interface PedidoPutArgs {
  dataVenda: string;
  cliente: ClientePutArgs;
  itens: PedidoItemArgs[];
}
