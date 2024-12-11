import { MainLayout } from "../../components/layouts/main";
import { generate_uuidv4 } from "../../utils/generate-uuid";
import { useFaturamentoStore } from "../../stores/faturamento.store";
import moment from "moment";
import { Cliente } from "./components/cliente";
import { Itens } from "./components/itens";
import api from "../../services/api-client";
import { PedidoPostArgs } from "../../interfaces/args/pedido-post.args";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiErrorHandler from "../../services/api-error-handler";
import { toast } from "react-toastify";
import { convertAmountToNumber } from "../../utils/convert-amout";

export default function Faturamento() {
  const navigate = useNavigate();

  const [loadingFaturamento, setLoadingFaturamento] = useState<boolean>(false);

  const {
    identificador,
    dataVenda,
    cliente,
    itens,
    setPedido,
    resetarProcessoDeFaturamento,
  } = useFaturamentoStore();

  const faturamentoIniciado: boolean = !!identificador && !!dataVenda;

  function iniciarProcessoFaturamento(): void {
    const guid = generate_uuidv4();
    setPedido({
      identificador: guid,
      dataVenda: moment().toJSON(), // Format: 2021-09-01T00:00:00.000Z
    });
  }

  async function finalizarFaturamento(): Promise<void> {
    setLoadingFaturamento(true);

    const args: PedidoPostArgs = {
      identificador,
      dataVenda,
      cliente,
      itens: itens.map((item) => ({
        produtoId: item.produtoId,
        descricao: item.descricao,
        quantidade: item.quantidade,
        precoUnitario: convertAmountToNumber(item.precoUnitario.toString()),
      })),
    };

    api
      .post("/api/pedidos", args)
      .then(({ data }) => {
        toast.success("Pedido faturado com sucesso!");
        console.log(data);
        navigate("/pedidos");
        resetarProcessoDeFaturamento();
        // navigate(`/pedidos/${data}`);
      })
      .catch((err) => {
        apiErrorHandler(err);
      })
      .finally(() => {
        setLoadingFaturamento(false);
      });
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Faturamento</h1>

        {faturamentoIniciado && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded max-w-fit"
            onClick={resetarProcessoDeFaturamento}
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
          <button
            className="bg-green-600 text-white px-4 py-2 rounded max-w-fit focus:outline-none"
            onClick={finalizarFaturamento}
            disabled={loadingFaturamento}
          >
            {loadingFaturamento ? "Faturando..." : "Finalizar Faturamento"}
          </button>
        </div>
      )}
    </MainLayout>
  );
}
