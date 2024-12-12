import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/main";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import TooltipButton from "../../components/tooltip";
import moment from "moment";
import api, { createCancelToken } from "../../services/api-client";
import apiErrorHandler from "../../services/api-error-handler";
import { FilaFaturamentoItemModel } from "../../interfaces/models/fila-faturamento-item.model";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { zTouch } from "react-syntax-highlighter/dist/esm/styles/prism";

const REFETCH_INTERVAL = 5e3;

export default function FilaReprocessamento() {
  const cancelToken = createCancelToken();

  const [faturamentos, setFaturamentos] = useState<FilaFaturamentoItemModel[]>(
    []
  );
  const [showPayload, setShowPayload] = useState<string | null>(null);

  async function obterFilaFaturamento(): Promise<void> {
    api
      .get<FilaFaturamentoItemModel[]>("/api/fila-faturamento", {
        cancelToken: cancelToken.token,
      })
      .then(({ data }) => {
        setFaturamentos(data);
      })
      .catch((err) => {
        apiErrorHandler(err);
      });
  }

  function getPayload(): string {
    const payload = faturamentos.find(
      (faturamento) => faturamento.pedidoId === showPayload
    )?.payload;

    if (!payload) {
      return "";
    }

    try {
      return JSON.stringify(JSON.parse(payload), null, 2);
    } catch {
      return payload;
    }
  }

  function handleCopyPayload(): void {
    const payload = getPayload();
    navigator.clipboard.writeText(payload);
    toast.info("Payload copiado para a área de transferência.");
  }

  function handleShowPayloadModal(pedidoId: string): void {
    setShowPayload(pedidoId);
  }

  function handleClosePayloadModal(): void {
    setShowPayload(null);
  }

  useEffect(() => {
    obterFilaFaturamento();

    const interval = setInterval(() => {
      obterFilaFaturamento();
    }, REFETCH_INTERVAL);

    return () => {
      clearInterval(interval);
      cancelToken.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-semibold">Fila de reprocessamento</h1>

      <p className="mt-4">
        Aqui você pode visualizar os pedidos que falharam no processo de
        faturamento (erro de comunicação com API de vendas), e estão na fila de
        faturamentos para serem processados novamente.
      </p>

      {faturamentos.length <= 0 ? (
        <p className="text-green-500 text-center mt-4">
          Nenhum pedido na fila de reprocessamento, todos os pedidos foram
          processados com sucesso.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {faturamentos.map((faturamento) => (
            <div
              className="bg-gray-50 p-4 rounded-xl grid grid-cols-1 xl:grid-cols-2 gap-4 hover:bg-blue-50 hover:shadow-lg transition-all"
              key={faturamento.id}
            >
              <div className="grid grid-cols-1 gap-2">
                <span className="flex items-center">
                  <strong>Pedido ID</strong>: {faturamento.pedidoId}
                  <FaClipboard
                    data-tooltip-id={`tooltip-${faturamento.pedidoId}`}
                    data-tooltip-variant="dark"
                    className="h-4 w-4 ml-1 text-gray-500 cursor-pointer focus:outline-none transition-all duration-300 ease-in-out active:scale-150"
                    onClick={() => {
                      navigator.clipboard.writeText(faturamento.pedidoId);
                      toast.info(
                        "ID do pedido copiado para a área de transferência."
                      );
                    }}
                  />
                  <TooltipButton
                    id={`tooltip-${faturamento.pedidoId}`}
                    text="Copiar identificador"
                  />
                </span>

                <p>
                  <strong>Criado em</strong>:{" "}
                  {moment(faturamento.criadoEm).add(-3, "hours").format("LLL")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center">
                  <p>
                    <strong>Payload</strong>:
                  </p>
                  <button
                    type="button"
                    onClick={() => handleShowPayloadModal(faturamento.pedidoId)}
                    className="text-blue-600 underline ml-2"
                  >
                    Visualizar
                  </button>
                </div>

                <p>
                  <strong>Número de tentativas</strong>:{" "}
                  {faturamento.tentativas}
                </p>
              </div>
            </div>
          ))}

          {showPayload && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={handleClosePayloadModal}
              ></div>
              <div className="relative max-h-[80vh] max-w-[80vw] z-10 rounded-t-xl">
                <div className="overflow-y-auto h-full w-full max-h-[80vh] max-w-[80vw] rounded-t-xl">
                  <SyntaxHighlighter
                    language="json"
                    style={zTouch}
                    showLineNumbers
                    wrapLongLines
                    customStyle={{
                      margin: 0,
                    }}
                  >
                    {getPayload()}
                  </SyntaxHighlighter>
                </div>
                <div className="absolute inset-x-0 -bottom-10 flex justify-between">
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="absolute bottom-0 left-0 w-1/2 p-4 bg-blue-500 text-white rounded-bl-3xl h-10 flex items-center justify-center"
                  >
                    Copiar
                  </button>

                  <button
                    type="button"
                    onClick={handleClosePayloadModal}
                    className="absolute bottom-0 right-0 w-1/2 p-4 bg-red-500 text-white text-lg rounded-br-3xl h-10 flex items-center justify-center"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}
