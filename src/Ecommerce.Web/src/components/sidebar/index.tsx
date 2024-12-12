import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaCartArrowDown, FaRegListAlt } from "react-icons/fa";
import { FaRotate, FaShop } from "react-icons/fa6";
import logo from "/logo.png";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Fecha a sidebar se clicar fora dela
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-[60px] flex items-center justify-between bg-slate-700 p-2 shadow-sm sm:hidden">
        <button
          ref={buttonRef}
          type="button"
          className="p-2 text-sm rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleSidebar}
        >
          <FaBars className="w-5 h-5 text-white" />
        </button>

        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 sm:hidden" />
        </Link>
      </div>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 sm:z-50 w-64 h-screen transition-transform border-r border-gray-200 bg-slate-700 text-white
           ${
             isOpen ? "translate-x-0 " : "-translate-x-full"
           } sm:translate-x-0 sm:pt-0 pt-[60px]`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="hidden sm:flex pb-3">
              <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-12" />
                <span className="ms-3 text-2xl font-semibold">Ecommerce</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg group">
                <FaShop className="w-5 h-5 transition duration-75 group-hover:text-slate-300" />
                <span className="flex-1 ms-3 whitespace-nowrap group-hover:text-slate-300">
                  Início
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/pedidos"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaRegListAlt className="w-5 h-5 transition duration-75 group-hover:text-slate-300" />
                <span className="flex-1 ms-3 whitespace-nowrap group-hover:text-slate-300">
                  Pedidos
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/faturamento"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaCartArrowDown className="w-5 h-5 transition duration-75 group-hover:text-slate-300" />
                <span className="flex-1 ms-3 whitespace-nowrap group-hover:text-slate-300">
                  Faturamento
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/fila-reprocessamento"
                className="flex items-center p-2 rounded-lg group"
              >
                <FaRotate className="w-5 h-5 transition duration-75 group-hover:text-slate-300" />
                <span className="flex-1 ms-3 whitespace-nowrap group-hover:text-slate-300">
                  Fila de reprocessamento
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
