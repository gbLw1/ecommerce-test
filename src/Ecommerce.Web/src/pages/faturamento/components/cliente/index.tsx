import { useState } from "react";
import { useFaturamentoStore } from "../../../../stores/faturamento.store";
import { useForm } from "react-hook-form";
import { ClientePostArgs } from "../../../../interfaces/args/cliente-post.args";
import clsx from "clsx";
import ReactInputMask from "react-input-mask";
import { ClienteCategoria } from "../../../../enums/cliente-categoria.enum";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { RemoveCliente } from "./components/remove-cliente";
import { EditCliente } from "./components/edit-cliente";
import { FaRotate } from "react-icons/fa6";
import { generate_uuidv4 } from "../../../../utils/generate-uuid";
import TooltipButton from "../../../../components/tooltip";

export const Cliente = () => {
  const { cliente, addCliente: setCliente } = useFaturamentoStore();

  const clienteCadastrado = cliente.nome && cliente.cpf && cliente.clienteId;

  const [cadastrandoCliente, setCadastrandoCliente] = useState<boolean>(false);
  const [editandoCliente, setEditandoCliente] = useState<boolean>(false);
  const [removendoCliente, setRemovendoCliente] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ClientePostArgs>();

  function gerarGuidClienteId() {
    setValue("clienteId", generate_uuidv4());
  }

  function handleCancelClick() {
    setCadastrandoCliente(false);
  }

  function onSubmit(data: ClientePostArgs) {
    setCliente(data);
    setCadastrandoCliente(false);
    reset();
  }

  return (
    <div className="grid grid-cols-1 gap-4 border border-gray-300 p-4 rounded bg-gray-50 h-fit">
      <h2 className="text-xl font-semibold">Cliente</h2>

      {clienteCadastrado && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="flex flex-col">
            <span className="text-sm">
              <strong>Cliente ID:</strong> {cliente.clienteId}
            </span>
            <span className="text-sm">
              <strong>Nome:</strong> {cliente.nome}
            </span>
            <span className="text-sm">
              <strong>CPF:</strong> {cliente.cpf}
            </span>
            <span className="text-sm">
              <strong>Categoria:</strong> {cliente.categoria}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
              onClick={() => setEditandoCliente(true)}
            >
              <FaPencilAlt />
              <span className="ml-2">Editar</span>
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
              onClick={() => setRemovendoCliente(true)}
            >
              <FaTrashAlt />
              <span className="ml-2">Remover</span>
            </button>
          </div>
        </div>
      )}

      {!clienteCadastrado && !cadastrandoCliente && (
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setCadastrandoCliente(true)}
        >
          Adicionar Cliente
        </button>
      )}

      {cadastrandoCliente && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <span className="text-lg font-semibold">Adicionar Cliente</span>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="clienteId"
            >
              Cliente ID
            </label>
            <div className="relative">
              <input
                {...register("clienteId", {
                  required: "Cliente ID é obrigatório",
                  // GUID Pattern
                  pattern: {
                    value:
                      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
                    message: "Cliente ID deve ser um GUID",
                  },
                })}
                className={clsx(
                  `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1 relative`,
                  errors.clienteId &&
                    "border-b-2 !border-rose-600 text-rose-600"
                )}
                placeholder="Cliente ID (GUID)"
              />
              <FaRotate
                data-tooltip-id={`tooltip-gerar-guid-cliente-id`}
                data-tooltip-variant="dark"
                className="cursor-pointer absolute right-2 top-2 text-gray-500 !border-none transition-all duration-300 ease-in-out active:rotate-90 focus:outline-none"
                onClick={gerarGuidClienteId}
              />
              <TooltipButton
                id={`tooltip-gerar-guid-cliente-id`}
                text="Gerar GUID"
              />
            </div>
            {errors.clienteId && (
              <span className="text-red-500 text-sm">
                {errors.clienteId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              {...register("nome", { required: "Nome é obrigatório" })}
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
              {...register("cpf", { required: "CPF é obrigatório" })}
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
            <label
              className="mb-1 form-label font-semibold text-sm text-zinc-700"
              htmlFor="categoria"
            >
              Categoria
            </label>
            <select
              {...register("categoria", {
                required: "Categoria é obrigatória",
              })}
              className={clsx(
                `w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors.categoria && "border-b-2 !border-rose-600 text-rose-600"
              )}
              defaultValue={""}
            >
              <option value="">Selecione uma categoria</option>
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

      {/* Editar cliente (Modal) */}
      {editandoCliente && (
        <EditCliente close={() => setEditandoCliente(false)} />
      )}

      {/* Remover clientee (Modal) */}
      {removendoCliente && (
        <RemoveCliente close={() => setRemovendoCliente(false)} />
      )}
    </div>
  );
};
