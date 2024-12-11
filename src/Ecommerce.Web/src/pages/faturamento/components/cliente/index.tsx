import { useState } from "react";
import { useFaturamentoPostStore } from "../../../../stores/faturamento-post.store";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { RemoveCliente } from "./components/remove-cliente";
import { EditCliente } from "./components/edit-cliente";
import { AddCliente } from "./components/add-cliente";

export const Cliente = () => {
  const { cliente } = useFaturamentoPostStore();

  const clienteCadastrado = cliente.nome && cliente.cpf && cliente.clienteId;

  const [cadastrandoCliente, setCadastrandoCliente] = useState<boolean>(false);
  const [editandoCliente, setEditandoCliente] = useState<boolean>(false);
  const [removendoCliente, setRemovendoCliente] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Cliente</h2>

      {clienteCadastrado && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="flex flex-col">
            <span className="text-sm">
              <strong>Cliente ID:</strong> {cliente.clienteId}
            </span>
            <span className="text-sm">
              <strong>Nome:</strong> {cliente.nome}
            </span>
            <span className="text-sm">
              <strong>CPF:</strong> {cliente.cpf}
            </span>
            <span className="text-sm">
              <strong>Categoria:</strong> {cliente.categoria}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              onClick={() => setEditandoCliente(true)}
            >
              <FaPencilAlt />
              <span className="ml-2">Editar</span>
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
              onClick={() => setRemovendoCliente(true)}
            >
              <FaTrashAlt />
              <span className="ml-2">Remover</span>
            </button>
          </div>
        </div>
      )}

      {!clienteCadastrado && !cadastrandoCliente && (
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setCadastrandoCliente(true)}
        >
          Adicionar Cliente
        </button>
      )}

      {/* Adicionar cliente (Form) */}
      {cadastrandoCliente && (
        <AddCliente setCadastrandoCliente={setCadastrandoCliente} />
      )}

      {/* Editar cliente (Modal) */}
      {editandoCliente && (
        <EditCliente close={() => setEditandoCliente(false)} />
      )}

      {/* Remover cliente (Modal) */}
      {removendoCliente && (
        <RemoveCliente close={() => setRemovendoCliente(false)} />
      )}
    </div>
  );
};
