import { MainLayout } from "../../components/layouts/main";
import { generate_uuidv4 } from "../../utils/generate-uuid";
import { useFaturamentoStore } from "../../stores/faturamento.store";
import moment from "moment";
import { Cliente } from "./components/cliente";
import { Itens } from "./components/itens";

export default function Faturamento() {
  const {
    identificador,
    dataVenda,
    cliente,
    itens,
    setPedido,
    cancelarProcessoDeFaturamento,
  } = useFaturamentoStore();

  // const [cadastrandoCliente, setCadastrandoCliente] = useState<boolean>(false);
  // const [adicionandoItem, setAdicionandoItem] = useState<boolean>(false);

  const faturamentoIniciado: boolean = !!identificador && !!dataVenda;

  function iniciarProcessoFaturamento(): void {
    const guid = generate_uuidv4();
    setPedido({
      identificador: guid,
      dataVenda: moment().format("YYYY-MM-DD"),
    });
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Faturamento</h1>

        {faturamentoIniciado && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded max-w-fit"
            onClick={cancelarProcessoDeFaturamento}
          >
            Cancelar processo
          </button>
        )}
      </div>

      {/* Iniciar processo de faturamento */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {!faturamentoIniciado && (
          <>
            <span className="text-sm">
              Clique no botão para gerar um identificador aleatório e uma data
              de venda para iniciar o processo de faturamento.
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded max-w-fit"
              onClick={iniciarProcessoFaturamento}
            >
              Iniciar
            </button>
          </>
        )}

        {faturamentoIniciado && (
          <>
            <p>
              <strong>Pedido em andamento!</strong>{" "}
              <i>
                Esse é um processo em memória, não persistido no banco de dados.
                Cancele o processo quando desejar, ou adicione o cliente e os
                itens que serão faturados a partir do identificador gerado
                abaixo
              </i>
            </p>
            <span className="bg-gray-100 p-2 rounded text-sm max-w-fit">
              <strong>Identificador:</strong> {identificador}
            </span>

            <span className="bg-gray-100 p-2 rounded text-sm max-w-fit">
              <strong>Data da venda:</strong>{" "}
              {moment(dataVenda).format("DD/MM/YYYY")}
            </span>
          </>
        )}
      </div>

      {faturamentoIniciado && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <Cliente />

          <Itens />
        </div>
      )}

      {faturamentoIniciado && cliente && itens.length > 0 && (
        <div className="flex justify-end mt-8">
          <button className="bg-green-600 text-white px-4 py-2 rounded max-w-fit">
            Finalizar Faturamento
          </button>
        </div>
      )}

      {/* {faturamentoIniciado && cadastrandoCliente && (
        <>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Cliente</h2>
            <p>Adicione o cliente que está realizando a compra.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Nome do cliente"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="CPF do cliente"
                className="border border-gray-300 p-2 rounded"
              />
              <select
                className="border border-gray-300 p-2 rounded"
                defaultValue="REGULAR"
              >
                <option value="REGULAR">Regular</option>
                <option value="PREMIUM">Premium</option>
                <option value="VIP">VIP</option>
              </select>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded max-w-fit"
                onClick={() =>
                  toast.success("Cliente registrado ao pedido com sucesso!")
                }
              >
                Registrar Cliente
              </button>
            </div>
          </div>
        </>
      )} */}
    </MainLayout>
  );
}
