import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { EditCliente } from "./components/edit-cliente";
import { useFaturamentoPutStore } from "../../../../../stores/faturamento-put.store";

export const Cliente = () => {
  const { clienteId, cliente } = useFaturamentoPutStore();

  const [editandoCliente, setEditandoCliente] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Cliente</h2>

      <div className="bg-gray-100 p-4 rounded-xl">
        <div className="flex flex-col">
          <span className="text-sm">
            <strong>Cliente ID:</strong> {clienteId}
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
        </div>
      </div>

      {/* Editar cliente (Modal) */}
      {editandoCliente && (
        <EditCliente close={() => setEditandoCliente(false)} />
      )}
    </div>
  );
};
