import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Notfound from "../pages/Notfound";
import Home from "../pages/Home";
import MainLayouts from "../layouts/MainLayouts";
import Inbox from "../pages/Inbox";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";
import AddConvertion from "../pages/AddConvertion";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import ConvertionContext from "../Context/ConvertionContext";
const CreateDRouter = createBrowserRouter([

      {
        path: "/",
        element : <PrivateRouter> <ConvertionContext><MainLayouts/></ConvertionContext></PrivateRouter>,
        children:[
          {
            path:"/inbox/:id",
            element: <Inbox/>
          },
           {
            path:"/users",
            element: <Users/>
          }, 
           {
            path:"/adduser",
            element: <AddUser/>
          },
          {
            path:"/addconvertion",
            element: <AddConvertion/>
          },
        ]            
      },        
       {
          path:"/login",
          element: <Login/>
       }
    
    ]
  
);

export default CreateDRouter;
