import { useForm } from "react-hook-form";
import { PedidoItemArgs } from "../../../../../../interfaces/args/pedido-item.args";
import { useFaturamentoPutStore } from "../../../../../../stores/faturamento-put.store";
import { convertAmountToBRL } from "../../../../../../utils/convert-amout";

interface Props {
  item: PedidoItemArgs;
  close: () => void;
}

export const RemoveItem = ({ item, close }: Props) => {
  const { deleteItem } = useFaturamentoPutStore();

  const { handleSubmit } = useForm<PedidoItemArgs>({
    values: item,
  });

  function onSubmit(data: PedidoItemArgs) {
    deleteItem(data);
    close();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="relative bg-white p-4 rounded z-10 w-full max-w-xl">
        <span className="text-lg font-semibold">Excluir item</span>

        <p className="text-lg font-semibold text-center text-rose-500">
          Deseja excluir o item?
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 mt-4"
        >
          <span>
            <strong>Produto ID:</strong> {item.produtoId}
          </span>
          <span>
            <strong>Descrição:</strong> {item.descricao}
          </span>
          <span>
            <strong>Quantidade:</strong> {item.quantidade}
          </span>
          <span>
            <strong>Preço unitário:</strong>{" "}
            {convertAmountToBRL(item.precoUnitario)}
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
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
