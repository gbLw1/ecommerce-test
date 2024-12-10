import { Link } from "react-router-dom";
import { MainLayout } from "../../components/layouts/main";
import { FaCartArrowDown, FaRegListAlt } from "react-icons/fa";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-semibold">Bem vindo!</h1>

      <h2 className="text-xl font-regular mt-4">Desafio Técnico: E-commerce</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Link
          to="/pedidos"
          className="bg-gray-50 p-4 rounded-lg flex items-center text-blue-500 hover:bg-blue-50"
        >
          <FaRegListAlt className="h-6 w-6 mr-2" />
          <span>Lista de pedidos</span>
        </Link>

        <Link
          to="/faturamento"
          className="bg-gray-50 p-4 rounded-lg flex items-center text-amber-500 hover:bg-amber-50"
        >
          <FaCartArrowDown className="h-6 w-6 mr-2" />
          <span>Faturamento (Processar venda)</span>
        </Link>
      </div>
    </MainLayout>
  );
}
