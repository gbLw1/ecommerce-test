import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import NotFound from "../pages/not-found";
import ListaPedidos from "../pages/pedidos";
import Faturamento from "../pages/faturamento";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/pedidos" element={<ListaPedidos />} />
        <Route path="/faturamento" element={<Faturamento />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
