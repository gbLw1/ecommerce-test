import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import ListaPedidos from "../pages/pedidos";
import Faturamento from "../pages/faturamento";
import DetalhePedido from "../pages/pedidos/detalhes";
import FilaReprocessamento from "../pages/fila-reprocessamento";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/pedidos" element={<ListaPedidos />} />
        <Route path="/pedidos/:pedidoId" element={<DetalhePedido />} />

        <Route path="/faturamento" element={<Faturamento />} />

        <Route path="/fila-reprocessamento" element={<FilaReprocessamento />} />
      </Routes>
    </Router>
  );
}
