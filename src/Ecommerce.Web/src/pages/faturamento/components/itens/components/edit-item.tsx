import clsx from "clsx";
import { useForm } from "react-hook-form";
import { PedidoItemArgs } from "../../../../../interfaces/args/pedido-item.args";
import InputCurrency from "../../../../../components/form/input-currency";
import { useFaturamentoStore } from "../../../../../stores/faturamento.store";

interface Props {
  item: PedidoItemArgs;
  close: () => void;
}

export const EditItem = ({ item, close }: Props) => {
  const { editItem } = useFaturamentoStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PedidoItemArgs>({
    values: item,
  });

  function onSubmit(data: PedidoItemArgs) {
    editItem(data);
    close();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="relative bg-white p-4 rounded z-10 w-full max-w-xl">
        <span className="text-lg font-semibold">Editar Item</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="produtoId"
            >
              Produto ID
            </label>
            <input
              {...register("produtoId", {
                required: "Produto ID é obrigatório",
              })}
              disabled
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1 text-gray-500 bg-gray-100`,
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
              onClick={close}
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
      </div>
    </div>
  );
};
