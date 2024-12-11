import { useState } from "react";
import { useFaturamentoStore } from "../../../../stores/faturamento.store";
import { useForm } from "react-hook-form";
import { PedidoItemArgs } from "../../../../interfaces/args/pedido-item.args";
import InputCurrency from "../../../../components/form/input-currency";
import clsx from "clsx";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { EditItem } from "./components/edit-item";
import { RemoveItem } from "./components/remove-item";

export const Itens = () => {
  const { itens, addItem } = useFaturamentoStore();

  const [cadastrandoItem, setCadastrandoItem] = useState<boolean>(false);
  const [editandoItem, setEditandoItem] = useState<PedidoItemArgs | null>(null);
  const [removendoItem, setRemovendoItem] = useState<PedidoItemArgs | null>(
    null
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PedidoItemArgs>();

  function handleCancelClick() {
    setCadastrandoItem(false);
    reset();
  }

  function onSubmit(data: PedidoItemArgs) {
    addItem(data);
    setCadastrandoItem(false);
    reset();
  }

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Itens</h2>

      {!cadastrandoItem && (
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setCadastrandoItem(true)}
        >
          Adicionar Item
        </button>
      )}

      {/* Novo item */}
      {cadastrandoItem && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          <span className="text-lg font-semibold">Adicionar Item</span>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="produtoId"
            >
              Produto ID
            </label>
            <input
              type="number"
              {...register("produtoId", {
                required: "Produto ID é obrigatório",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.produtoId && "border-b-2 !border-rose-600 text-rose-600"
              )}
              placeholder="Produto ID"
            />
            {errors.produtoId && (
              <span className="text-red-500 text-sm">
                {errors.produtoId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="descricao"
            >
              Descrição
            </label>
            <input
              {...register("descricao", {
                required: "Descrição é obrigatória",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.descricao && "border-b-2 !border-rose-600 text-rose-600"
              )}
              placeholder="Descrição"
            />
            {errors.descricao && (
              <span className="text-red-500 text-sm">
                {errors.descricao.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="quantidade"
            >
              Quantidade
            </label>
            <input
              type="number"
              {...register("quantidade", {
                required: "Quantidade é obrigatória",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.quantidade && "border-b-2 !border-rose-600 text-rose-600"
              )}
              placeholder="Quantidade"
            />
            {errors.quantidade && (
              <span className="text-red-500 text-sm">
                {errors.quantidade.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <InputCurrency
              control={control}
              errors={errors}
              name="precoUnitario"
              validation={{ required: "Preço unitário é obrigatório" }}
              label="Preço unitário"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      )}

      {/* Lista de itens */}
      {itens.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {itens.map((item) => (
            <div className="bg-gray-100 p-4 rounded-xl" key={item.produtoId}>
              <div className="flex flex-col">
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
                  <strong>Preço unitário</strong>: {item.precoUnitario}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => setEditandoItem(item)}
                >
                  <FaPencilAlt />
                  <span className="ml-2">Editar</span>
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={() => setRemovendoItem(item)}
                >
                  <FaTrashAlt />
                  <span className="ml-2">Remover</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editar item (Modal) */}
      {editandoItem && (
        <EditItem item={editandoItem} close={() => setEditandoItem(null)} />
      )}

      {/* Remover item (Modal) */}
      {removendoItem && (
        <RemoveItem item={removendoItem} close={() => setRemovendoItem(null)} />
      )}
    </div>
  );
};
