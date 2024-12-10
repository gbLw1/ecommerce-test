import React from "react";
import { Sidebar } from "../sidebar";
import { Header } from "../header";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <main className="bg-content flex-1 p-4 mt-[60px] ml-0 sm:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
