import { useState } from "react";
import { useFaturamentoStore } from "../../../../stores/faturamento.store";
import { PedidoItemArgs } from "../../../../interfaces/args/pedido-item.args";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { EditItem } from "./components/edit-item";
import { RemoveItem } from "./components/remove-item";
import { AddItem } from "./components/add-item";

export const Itens = () => {
  const { itens } = useFaturamentoStore();

  const [cadastrandoItem, setCadastrandoItem] = useState<boolean>(false);
  const [editandoItem, setEditandoItem] = useState<PedidoItemArgs | null>(null);
  const [removendoItem, setRemovendoItem] = useState<PedidoItemArgs | null>(
    null
  );

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Itens</h2>

      {!cadastrandoItem && (
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setCadastrandoItem(true)}
        >
          Adicionar Item
        </button>
      )}

      {/* Adicionar item (form) */}
      {cadastrandoItem && <AddItem setCadastrandoItem={setCadastrandoItem} />}

      {/* Lista de itens */}
      {itens.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {itens.map((item) => (
            <div className="bg-gray-100 p-4 rounded-xl" key={item.produtoId}>
              <div className="flex flex-col">
                <span className="text-sm">
                  <strong>Produto ID</strong>: {item.produtoId}
                </span>
                <span className="text-sm">
                  <strong>Descrição</strong>: {item.descricao}
                </span>
                <span className="text-sm">
                  <strong>Quantidade</strong>: {item.quantidade}
                </span>
                <span className="text-sm">
                  <strong>Preço unitário</strong>: {item.precoUnitario}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => setEditandoItem(item)}
                >
                  <FaPencilAlt />
                  <span className="ml-2">Editar</span>
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => setRemovendoItem(item)}
                >
                  <FaTrashAlt />
                  <span className="ml-2">Remover</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editar item (Modal) */}
      {editandoItem && (
        <EditItem item={editandoItem} close={() => setEditandoItem(null)} />
      )}

      {/* Remover item (Modal) */}
      {removendoItem && (
        <RemoveItem item={removendoItem} close={() => setRemovendoItem(null)} />
      )}
    </div>
  );
};
