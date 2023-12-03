import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authntication";
import axios from "axios";

export default function BottomPart() {
  const {getCurrentuser} = useAuth();
  const navigate = useNavigate()
  const handelLogOut = () =>{
     axios.delete(`${import.meta.env.VITE_API_URL}/login`,{withCredentials:true}).then((res)=>{
      if(res.data.success){
        getCurrentuser()
        navigate("/login")
      }
      else if(res.data.error){
        alert(res.data.error)
        console.log(res.data.error)
      }
     }).catch((err)=> console.log(err)) 
  }
  return (
    <div className=" px-4 flex flex-col items-center lg:flex-row h-full md:text-3xl justify-evenly">
      <div className="addConvertion">
        <Link to="/addconvertion">
          <button className="bg-slate-700 hover:opacity-50 transition-all w-10 h-10  md:w-14 md:h-14 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
      <div className="inbox">
        <Link to="/">
          <button className="bg-slate-700 hover:opacity-50 transition-all w-10 h-10  md:w-14 md:h-14 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-message-lines"></i>
          </button>
        </Link>
      </div>
      <div className="Users">
        <Link to="/users">
          
          <button className="bg-slate-700 hover:opacity-50 transition-all w-10 h-10  md:w-14 md:h-14 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-user"></i>
          </button>
        </Link>
      </div>
      <div className="LogOut">
        <button onClick={handelLogOut} className="bg-slate-700 hover:opacity-50 transition-all w-10 h-10  md:w-14 md:h-14 flex justify-center items-center rounded-full">
          <i className="fa-sharp fa-regular fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
}
