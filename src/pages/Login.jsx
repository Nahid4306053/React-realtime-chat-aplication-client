import React, { useState } from "react";
import Login_png from '/Login_png.png'
import user_login from '/user_login.jpg'
import InputBox from "../components/InputBox";
import axios from "axios";
import { useAuth } from "../Context/Authntication";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [errors,setErrors] = useState([])
  const {getCurrentuser} = useAuth();
  const navigate = useNavigate()
  const handellogin = (form) =>{
    form.preventDefault()
   const identy = form.target.identy.value;
   const password = form.target.password.value;


   axios.post(`${import.meta.env.VITE_API_URL}/login`,{identy , password} ,{
    headers:{
      "Content-Type": "application/json"
    },
    withCredentials:true
   }).then((res)=>{

    if(res.data.success){
      console.log(res.data.success);
      getCurrentuser();
      navigate('/');
    }
    else{   
     let errs = []
      for(let err in res.data.error){
       errs.push(res.data.error[err].msg);
      }
      setErrors(errs)
    }
   })
  
  }
  return ( 
    <div className="mainlayouts min-h-screen bg-sky-500 flex justify-center items-center">
      <div className="bg-slate-800 flex rounded-lg overflow-hidden h-[600px] md:h-[800px] w-11/12 md:w-9/12">
        <div className="sidebar hidden lg:flex   px-5  justify-center items-center lg:w-3/6 2xl:w-2/6 bg-[#172130] h-full">
       <img src={Login_png} alt="" />
        </div>
        <div className="Contentnpart h-full items-center flex justify-center w-full lg:w-3/6 2xl:w-4/6">
         <div className="w-full max-w-lg px-4">
           <div className="img_user">
            <img className="max-h-44 mx-auto my-5" src={user_login} alt="" />
            <h1 className="text-5xl text-center mb-5 font-bold">Log in</h1>
           </div>
           {errors.length > 0 && 
              <div className='w-full mb-5 errors max-w-xl mx-auto p-4 rounded-lg text-red-600 bg-red-300' >
              <ul className='list-disc ml-4'>
                {errors.map((ele,ind)=>{
                      return (
                        <li key={ind}>{ele}</li>
                      )
                })}
                 
              </ul>
           </div>
            }
         <form method="post" onSubmit={handellogin} className="w-full grid gap-4">
           <InputBox placeholder="Email or phone number" name="identy"/>
           <InputBox placeholder="Password" name="password"/>
           <button type="submit" className="btn btn-secondary">log in</button>
          </form> 
         </div> 
        </div>
      </div>
    </div>
  );
}
