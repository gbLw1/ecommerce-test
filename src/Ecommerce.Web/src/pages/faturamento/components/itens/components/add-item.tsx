import clsx from "clsx";
import { useForm } from "react-hook-form";
import { PedidoItemArgs } from "../../../../../interfaces/args/pedido-item.args";
import { useFaturamentoStore } from "../../../../../stores/faturamento.store";
import InputCurrency from "../../../../../components/form/input-currency";

interface Props {
  setCadastrandoItem: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddItem = ({ setCadastrandoItem }: Props) => {
  const { addItem } = useFaturamentoStore();

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
  );
};
