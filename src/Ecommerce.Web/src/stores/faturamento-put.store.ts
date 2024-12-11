import { create } from "zustand";
import { ClienteCategoria } from "../enums/cliente-categoria.enum";
import { PedidoItemArgs } from "../interfaces/args/pedido-item.args";
import { PedidoPutArgs } from "../interfaces/args/pedido-put.args";
import { ClientePutArgs } from "../interfaces/args/cliente-put.args";

interface FaturamentoPutStore extends PedidoPutArgs {
  setPedidoDataVenda: (dataVenda: string) => void;

  clienteId: string;
  setClienteId: (clienteId: string) => void;
  setCliente: (cliente: ClientePutArgs) => void;
  editCliente: (cliente: ClientePutArgs) => void;

  setItens: (itens: PedidoItemArgs[]) => void;
  addItem: (item: PedidoItemArgs) => void;
  editItem: (item: PedidoItemArgs) => void;
  deleteItem: (item: PedidoItemArgs) => void;

  resetarProcessoDeEdicao: () => void;
}

export const useFaturamentoPutStore = create<FaturamentoPutStore>()((set) => ({
  dataVenda: "",
  cliente: {
    nome: "",
    categoria: ClienteCategoria.REGULAR,
    clienteId: "",
    cpf: "",
  },
  itens: [],

  setPedidoDataVenda: (dataVenda) => set({ dataVenda }),

  clienteId: "",
  setClienteId: (clienteId) => set({ clienteId }),
  setCliente: (cliente) => set({ cliente }),
  editCliente: (cliente) => set({ cliente }),

  setItens: (itens) => set({ itens }),
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

  resetarProcessoDeEdicao: () =>
    set({
      dataVenda: "",
      cliente: {
        nome: "",
        categoria: ClienteCategoria.REGULAR,
        cpf: "",
      },
      itens: [],
    }),
}));
