import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateDRouter from '../src/Routes/Routes'
import Authntication from "./Context/Authntication";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Authntication> <RouterProvider router={CreateDRouter}></RouterProvider></Authntication>
    </React.StrictMode> 

);
