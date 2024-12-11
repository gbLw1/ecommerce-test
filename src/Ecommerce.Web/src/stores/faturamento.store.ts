import { create } from "zustand";
import { PedidoPostArgs } from "../interfaces/args/pedido-post.args";
import { ClienteCategoria } from "../enums/cliente-categoria.enum";
import { PedidoItemArgs } from "../interfaces/args/pedido-item.args";
import { ClientePostArgs } from "../interfaces/args/cliente-post.args";

interface FaturamentoStore extends PedidoPostArgs {
  setPedido: (
    pedido: Pick<PedidoPostArgs, "identificador" | "dataVenda">
  ) => void;
  setCliente: (cliente: ClientePostArgs) => void;
  addItem: (item: PedidoItemArgs) => void;
  editItem: (item: PedidoItemArgs) => void;
  deleteItem: (item: PedidoItemArgs) => void;
  cancelarProcessoDeFaturamento: () => void;
}

export const useFaturamentoStore = create<FaturamentoStore>()((set) => ({
  cliente: {
    nome: "",
    categoria: ClienteCategoria.REGULAR,
    clienteId: "",
    cpf: "",
  },
  dataVenda: "",
  identificador: "",
  itens: [],
  setPedido: (pedido) => set((state) => ({ ...state, ...pedido })),
  setCliente: (cliente) => set({ cliente }),
  addItem: (item) => set((state) => ({ itens: [...state.itens, item] })),
  editItem: (item) =>
    set((state) => ({
      itens: state.itens.map((i) =>
        i.produtoId === item.produtoId ? item : i
      ),
    })),
  deleteItem: (item) =>
    set((state) => ({
      itens: state.itens.filter((i) => i.produtoId !== item.produtoId),
    })),
  cancelarProcessoDeFaturamento: () =>
    set({
      cliente: {
        nome: "",
        categoria: ClienteCategoria.REGULAR,
        clienteId: "",
        cpf: "",
      },
      dataVenda: "",
      identificador: "",
      itens: [],
    }),
}));