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
    </MainLayout>
  );
}
