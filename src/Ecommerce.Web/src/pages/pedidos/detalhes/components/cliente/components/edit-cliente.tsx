import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ClienteCategoria } from "../../../../../../enums/cliente-categoria.enum";
import ReactInputMask from "react-input-mask";
import { useFaturamentoPutStore } from "../../../../../../stores/faturamento-put.store";
import { ClientePutArgs } from "../../../../../../interfaces/args/cliente-put.args";

interface Props {
  close: () => void;
}

export const EditCliente = ({ close }: Props) => {
  const { clienteId, cliente, editCliente } = useFaturamentoPutStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientePutArgs>({
    values: cliente,
  });

  function onSubmit(data: ClientePutArgs) {
    editCliente(data);
    close();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={close}
      ></div>
      <div className="relative bg-white p-4 rounded z-10 w-full max-w-xl">
        <span className="text-lg font-semibold">Editar Cliente</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="clienteId"
            >
              Cliente ID
            </label>
            <input
              disabled
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1 text-gray-500 bg-gray-100"
              placeholder="Cliente ID"
              value={clienteId}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              {...register("nome", {
                required: "Nome é obrigatório",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.nome && "border-b-2 !border-rose-600 text-rose-600"
              )}
              placeholder="Nome"
            />
            {errors.nome && (
              <span className="text-red-500 text-sm">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="cpf"
            >
              CPF
            </label>
            <ReactInputMask
              mask="999.999.999-99"
              {...register("cpf", {
                required: "CPF é obrigatório",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.cpf && "border-b-2 !border-rose-600 text-rose-600"
              )}
              placeholder="CPF"
            />
            {errors.cpf && (
              <span className="text-red-500 text-sm">{errors.cpf.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <select
              {...register("categoria", {
                required: "Categoria é obrigatória",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.categoria && "border-b-2 !border-rose-600 text-rose-600"
              )}
            >
              {Object.values(ClienteCategoria).map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <span className="text-red-500 text-sm">
                {errors.categoria.message}
              </span>
            )}
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
