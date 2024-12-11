import { useFaturamentoPostStore } from "../../../../../stores/faturamento-post.store";

interface Props {
  close: () => void;
}

export const RemoveCliente = ({ close }: Props) => {
  const { cliente, deleteCliente } = useFaturamentoPostStore();

  function handleDeleteCliente() {
    deleteCliente();
    close();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="relative bg-white p-4 rounded z-10 w-full max-w-xl">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Excluir cliente</span>

          <p className="text-lg font-semibold text-center text-rose-500">
            Deseja excluir o cliente?
          </p>
          <div className="grid grid-cols-1 gap-2 mt-4">
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

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={close}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteCliente}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
