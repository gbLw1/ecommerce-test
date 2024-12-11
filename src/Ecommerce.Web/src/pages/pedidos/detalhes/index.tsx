import moment from "moment";
import { Cliente } from "./components/cliente";
import { Itens } from "./components/itens";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MainLayout } from "../../../components/layouts/main";
import apiErrorHandler from "../../../services/api-error-handler";
import api from "../../../services/api-client";
import { PedidoPutArgs } from "../../../interfaces/args/pedido-put.args";
import { PedidoItemArgs } from "../../../interfaces/args/pedido-item.args";
import { PedidoModel } from "../../../interfaces/models/pedido.model";
import { FaChevronLeft } from "react-icons/fa";
import { useFaturamentoPutStore } from "../../../stores/faturamento-put.store";

export default function DetalhePedido() {
  const navigate = useNavigate();

  const { pedidoId } = useParams<{ pedidoId: string }>();

  const [loadingGet, setLoadingGet] = useState<boolean>(false);
  const [loadingPut, setLoadingPut] = useState<boolean>(false);

  const {
    dataVenda,
    setPedidoDataVenda,
    cliente,
    setClienteId,
    setCliente,
    itens,
    setItens,
    resetarProcessoDeEdicao,
  } = useFaturamentoPutStore();

  async function getPedidoAtual(): Promise<void> {
    setLoadingGet(true);

    api
      .get<PedidoModel>(`/api/pedidos/${pedidoId}?status=PENDENTE`)
      .then(({ data }) => {
        setPedidoDataVenda(data.dataVenda);
        setClienteId(data.cliente.clienteId);
        setCliente(data.cliente);
        setItens(
          data.itens.map((item: PedidoItemArgs) => ({
            ...item,
          }))
        );
      })
      .catch((err) => {
        apiErrorHandler(err);
      })
      .finally(() => {
        setLoadingGet(false);
      });
  }

  async function salvarPedidoEFaturar(): Promise<void> {
    setLoadingPut(true);

    const args: PedidoPutArgs = {
      dataVenda,
      cliente: {
        nome: cliente.nome,
        cpf: cliente.cpf,
        categoria: cliente.categoria,
      },
      itens: itens.map((item: PedidoItemArgs) => ({
        ...item,
      })),
    };

    api
      .put<PedidoModel | null>(`/api/pedidos/${pedidoId}`, args)
      .then(() => {
        toast.success("Pedido alterado com sucesso!");
        navigate("/pedidos");
        resetarProcessoDeEdicao();
      })
      .catch((err) => {
        apiErrorHandler(err);
      })
      .finally(() => {
        setLoadingPut(false);
      });
  }

  useEffect(() => {
    getPedidoAtual();
    resetarProcessoDeEdicao();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Link
        to="/pedidos"
        className="text-blue-500 hover:text-blue-700 flex items-center"
      >
        <FaChevronLeft />
        <span className="ml-2">Voltar</span>
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Detalhes do pedido</h1>
      </div>

      {loadingGet && (
        <div className="mt-4">
          <p>Carregando...</p>
        </div>
      )}

      {!loadingGet && !dataVenda && (
        <div className="mt-4">
          <p className="text-red-500">
            Pedido não encontrado ou já processado.
          </p>
        </div>
      )}

      {!loadingGet && dataVenda && (
        <>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <p>
              <i>
                Após salvar a edição do pedido, será enviado para a API de
                faturamento automaticamente para tentar processar novamente.
              </i>
            </p>
            <span className="bg-gray-100 p-2 rounded text-sm max-w-fit">
              <strong>Identificador:</strong> {pedidoId}
            </span>

            <span className="bg-gray-100 p-2 rounded text-sm max-w-fit">
              <strong>Data da venda:</strong>{" "}
              {moment(dataVenda).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Cliente />

            <Itens />
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded max-w-fit focus:outline-none"
              onClick={salvarPedidoEFaturar}
              disabled={loadingPut}
            >
              {loadingPut ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </>
      )}
    </MainLayout>
  );
}
