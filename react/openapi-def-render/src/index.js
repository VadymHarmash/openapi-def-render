import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DefinitionProvider } from "./context/definitionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DefinitionProvider>
      <App />
    </DefinitionProvider>
  </React.StrictMode>,
);

reportWebVitals();
