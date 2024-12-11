import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/main";
import api, { createCancelToken } from "../../services/api-client";
import apiErrorHandler from "../../services/api-error-handler";
import { PedidoModel } from "../../interfaces/models/pedido.model";
import { convertAmountToBRL } from "../../utils/convert-amout";
import { convertDate } from "../../utils/convert-date";
import { FaChevronDown, FaChevronUp, FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import { PedidoStatus } from "../../enums/pedido-status.enum";
import clsx from "clsx";
import TooltipButton from "../../components/tooltip";

interface StatusStyle {
  dot: string;
  text: string;
  label: string;
}

const statusStyles: Record<PedidoStatus, StatusStyle> = {
  [PedidoStatus.PENDENTE]: {
    dot: "bg-yellow-500",
    text: "text-yellow-600",
    label: "Pendente",
  },
  [PedidoStatus.CONCLUIDO]: {
    dot: "bg-green-500",
    text: "text-green-500",
    label: "Concluído",
  },
  [PedidoStatus.CANCELADO]: {
    dot: "bg-red-500",
    text: "text-red-500",
    label: "Cancelado",
  },
};

export default function ListaPedidos() {
  const cancelToken = createCancelToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [pedidos, setPedidos] = useState<PedidoModel[]>([]);
  const [itensExpandidos, setItensExpandidos] = useState<string[]>([]);

  function handleExpandirItens(pedidoId: string): void {
    if (itensExpandidos.includes(pedidoId)) {
      setItensExpandidos(itensExpandidos.filter((id) => id !== pedidoId));
    } else {
      setItensExpandidos([...itensExpandidos, pedidoId]);
    }
  }

  async function obterPedidos(): Promise<void> {
    setLoading(true);

    api
      .get("/api/pedidos", { cancelToken: cancelToken.token })
      .then(({ data }) => {
        setPedidos(data);
      })
      .catch((err) => {
        apiErrorHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    obterPedidos();

    return () => {
      cancelToken.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-semibold">Lista de pedidos</h1>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : pedidos.length <= 0 ? (
        <p className="text-rose-500 text-center">Nenhum pedido encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {pedidos.map((pedido) => (
            <div
              className={clsx(
                "bg-gray-50 p-4 rounded-xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 hover:bg-blue-50 hover:shadow-lg transition-all",
                itensExpandidos.includes(pedido.identificador) &&
                  "bg-blue-50 shadow-lg"
              )}
              key={pedido.identificador}
            >
              {/* Informações principais do pedido */}
              <div className="flex flex-col">
                <span className="text-xl font-semibold mb-2">Pedido</span>
                <span className="text-sm flex items-center">
                  <strong>Identificador</strong>: {pedido.identificador}
                  <FaClipboard
                    data-tooltip-id={`tooltip-${pedido.identificador}`}
                    data-tooltip-variant="dark"
                    className="h-4 w-4 ml-1 text-gray-500 cursor-pointer focus:outline-none transition-all duration-300 ease-in-out active:scale-150"
                    onClick={() => {
                      navigator.clipboard.writeText(pedido.identificador);
                      toast.info(
                        "Identificador copiado para a área de transferência."
                      );
                    }}
                  />
                  <TooltipButton
                    id={`tooltip-${pedido.identificador}`}
                    text="Copiar identificador"
                  />
                </span>
                <span className="text-sm">
                  <strong>Data da venda</strong>:{" "}
                  {convertDate(pedido.dataVenda, "DD/MM/YYYY HH:mm:ss")}
                </span>
                <span className="text-sm">
                  <strong>Subtotal</strong>:{" "}
                  {convertAmountToBRL(pedido.subTotal)}
                </span>
                <span className="text-sm">
                  <strong>Descontos</strong>:{" "}
                  {pedido.desconto > 0 ? (
                    convertAmountToBRL(pedido.desconto)
                  ) : (
                    <i>Nenhum desconto aplicado</i>
                  )}
                </span>
                <span className="text-sm">
                  <strong>Valor total</strong>:{" "}
                  {convertAmountToBRL(pedido.valorTotal)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    <strong>Status</strong>:
                  </span>
                  <div
                    className={clsx(
                      "w-2 h-2 rounded-full",
                      statusStyles[pedido.status].dot
                    )}
                  />
                  <span
                    className={clsx(
                      "font-semibold",
                      statusStyles[pedido.status].text
                    )}
                  >
                    {statusStyles[pedido.status].label}
                  </span>
                </div>
              </div>

              {/* Informações do cliente */}
              <div className="flex flex-col">
                <span className="text-xl font-semibold mb-2">Cliente</span>
                <span className="text-sm">
                  <strong>Cliente ID</strong>: {pedido.cliente.clienteId}
                </span>
                <span className="text-sm">
                  <strong>Nome</strong>: {pedido.cliente.nome}
                </span>
                <span className="text-sm">
                  <strong>CPF</strong>: {pedido.cliente.cpf}
                </span>
                <span className="text-sm">
                  <strong>Categoria</strong>: {pedido.cliente.categoria}
                </span>
              </div>

              {/* Botões e controle de expansão */}
              <div className="flex flex-col gap-4 justify-end">
                {pedido.status === PedidoStatus.PENDENTE && (
                  <button
                    className="flex items-center border-2 border-green-600 text-green-600 p-1 w-full max-w-fit rounded-lg"
                    onClick={() => {
                      // TODO: Implementar alteração de pedido
                    }}
                  >
                    Alterar pedido
                  </button>
                )}

                <button
                  className="flex items-center border-b-2 border-blue-500 text-blue-500 p-1 w-full max-w-fit"
                  onClick={() => handleExpandirItens(pedido.identificador)}
                >
                  <span>Exibir itens do pedido</span>
                  {itensExpandidos.includes(pedido.identificador) ? (
                    <FaChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <FaChevronDown className="h-4 w-4 ml-2" />
                  )}
                </button>
              </div>

              {/* Itens do pedido expandido */}
              {itensExpandidos.includes(pedido.identificador) && (
                <div className="col-span-1 lg:col-span-2 xl:col-span-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {pedido.itens.map((item) => (
                      <div
                        className="bg-gray-100 p-4 rounded-xl"
                        key={item.produtoId}
                      >
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold">Item</span>
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
                            <strong>Preço unitário</strong>:{" "}
                            {convertAmountToBRL(item.precoUnitario)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
