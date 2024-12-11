import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/global.css";
import "react-tooltip/dist/react-tooltip.css";

createRoot(document.getElementById("root")!).render(<App />);
