import React from 'react'
import { useAuth } from '../../Context/Authntication'
import user from '/User.jpg'
export default function Useravatar() {
  const {user} = useAuth()

  return (
    <div className='p-4 w-full '>
       <div className="Currentuser w-full  flex gap-6 justify-center items-center">
        <div>
        <div className=" ring-sky-500 ring-4 currentuser_avatar md:w-20 h-20 max-w-[80px]  rounded-full overflow-hidden">
            <img className='object-cover  h-full w-full' src={import.meta.env.VITE_API_URL_IMG + "/avatars/" + user.avatar} alt="" />       
          </div>
        </div>
          <div className="side w-4/6 hidden lg:block">
            <div className="username">
               <h1 className='text-xl  font-semibold flex items-center'>{user.name.slice(0,8)}{user.role === "admin" && <span className='badge badge-secondary ml-2'>{user.role}</span>}</h1>     
            </div>
            <div className="serchbox mt-2"> 
              <input placeholder='Search Your Buddy' type="text" className='input rounded-none input-sm  focus:outline-none w-full bg-transparent input-bordered' name="" id="" />
             </div>        
          </div>          
       </div>             
    </div>
  )
}
