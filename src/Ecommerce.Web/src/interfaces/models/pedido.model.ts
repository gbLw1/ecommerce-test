import { PedidoStatus } from "../../enums/pedido-status.enum";
import { ClienteModel } from "./cliente.model";
import { PedidoItemModel } from "./pedido-item.model";

export interface PedidoModel {
  identificador: string;
  dataVenda: string;
  cliente: ClienteModel;
  itens: PedidoItemModel[];
  subTotal: number;
  desconto: number;
  valorTotal: number;
  status: PedidoStatus;
}
