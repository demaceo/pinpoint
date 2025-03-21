import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./styles/theme.css";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Analytics />
    <App />
  </React.StrictMode>
);
