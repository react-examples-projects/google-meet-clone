import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

import "inter-ui/inter.css"
import "./styles/index.scss";
import "./styles/utils.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <GeistProvider>
      <Routers />
    </GeistProvider>
  </React.StrictMode>
);
