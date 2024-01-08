import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {  RouterProvider } from "react-router-dom";
import CreateDRouter from '../src/Routes/Routes'
import Authntication from "./Context/Authntication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line react-refresh/only-export-components
const ClentQuery = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <QueryClientProvider client={ClentQuery}>
      <Authntication> <RouterProvider router={CreateDRouter}></RouterProvider></Authntication>
      </QueryClientProvider>
    </React.StrictMode> 

);
