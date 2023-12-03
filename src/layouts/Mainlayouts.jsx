import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import "../App.css"
import { Outlet } from 'react-router-dom'
export default function MainLayouts() {
  return (
    <div className="mainlayouts min-h-screen bg-sky-500 flex justify-center items-center">
       <div className="bg-slate-800 flex rounded-lg overflow-hidden h-[550px] md:h-[800px] w-11/12 md:w-9/12">
         <div className="sidebar w-20 md:w-28  lg:w-2/6 2xl:w-1/4 bg-[#172130] h-full">
            <Sidebar/>
         </div> 
         <div className="Contentnpart md:w-[calc(100%-112px)] lg:w-4/6 2xl:w-3/4">
           <Outlet></Outlet>
         </div>
       </div>              
    </div>
  )
}
