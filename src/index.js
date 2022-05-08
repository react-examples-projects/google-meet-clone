import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import RoomProvider from "./context/RoomProvider";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";

import "inter-ui/inter.css";
import "./styles/index.scss";
import "./styles/utils.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <GeistProvider>
      <RoomProvider>
        <QueryClientProvider client={queryClient}>
          <Routers />
        </QueryClientProvider>
      </RoomProvider>
    </GeistProvider>
  </React.StrictMode>
);
