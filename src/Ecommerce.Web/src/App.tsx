import { ToastContainer } from "react-toastify";
import AppRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}
