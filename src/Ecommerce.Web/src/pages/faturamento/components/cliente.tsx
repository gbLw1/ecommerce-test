import { useFaturamentoStore } from "../../../stores/faturamento.store";

export const Cliente = () => {
  const { cliente } = useFaturamentoStore();

  const clienteCadastrado = cliente.nome && cliente.cpf && cliente.clienteId;
  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Cliente</h2>
      {clienteCadastrado ? (
        <div className="grid grid-cols-1 gap-4">
          <span>
            <strong>Cliente ID:</strong> {cliente.clienteId}
          </span>
          <span>
            <strong>Nome:</strong> {cliente.nome}
          </span>
          <span>
            <strong>CPF:</strong> {cliente.cpf}
          </span>
          <span>
            <strong>Categoria:</strong> {cliente.categoria}
          </span>
        </div>
      ) : (
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Adicionar Cliente
        </button>
      )}
    </div>
  );
};
