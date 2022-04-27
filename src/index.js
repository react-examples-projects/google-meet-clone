import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/utils.css"; 
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "inter-ui/inter.css"
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <GeistProvider>
      <App />
    </GeistProvider>
  </React.StrictMode>
);
