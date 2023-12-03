import React, { useState } from 'react'
import InputBox from '../components/InputBox'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function AddUser() {
const [previewImg,setPreviewImg] = useState() 
const [errors,setErrors] = useState([])
const navigate = useNavigate()
const handelAddUser = (form) =>{
    form.preventDefault()
   const password = form.target.password.value;
   const confirmepassword = form.target.confirmepassword.value;
   const avatar = form.target.avatar.files;

   let Error = [];
   if(password !== confirmepassword){
    console.log(password, confirmepassword);
        Error.push('Password and confirm password not match')
   }
   if(avatar.length === 0){

    Error.push("Please Upload a Propfile Picture")
   } 
   setErrors(Error);
   const formdata = new FormData(form.target) 
   if(Error.length === 0){
      axios.post(`${import.meta.env.VITE_API_URL}/users/set`,formdata,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true

      }).then((res)=>{
        if(res.data.error){
          console.log(res.data.error);
          for(let err in res.data.error){
            setErrors([...errors ,res.data.error[err].msg ])
          }

        }
        else{
          alert(res.data?.Success?.msg)
          navigate("/users")
        }
      }).catch((err)=>{
        console.log(err);
      }) 
   }
}

  return (
    <div className='md:p-10 p-4 custom_scrollbar grid grid-cols-2  h-full overflow-auto items-center justify-center'>
         <div className="col-span-12">
         <div className="profile_view relative overflow-hidden mx-auto h-56 flex justify-center items-center w-56 rounded-full border">
           <div className='text-center'><p>User Profile img <br /> Preview</p></div>    
           <img src={previewImg} className='h-full w-full object-cover absolute' alt="" />     
         </div>      
          </div>  
          <div className="col-span-12 my-5">
            {errors.length > 0 && 
              <div className='w-full errors max-w-xl mx-auto p-4 rounded-lg text-red-600 bg-red-300' >
              <ul className='list-disc ml-4'>
                {errors.map((ele,ind)=>{
                      return (
                        <li key={ind}>{ele}</li>
                      )
                })}
                 
              </ul>
           </div>
            }
           </div> 
         <div className='col-span-12 '>    
          <form encType='multpartformdata' onSubmit={handelAddUser} className='mx-auto  max-w-2xl md:px-10 mt-5 grid gap-4'>
       <InputBox placeholder="Username" type="text" name="name"/>              
       <InputBox placeholder="Email" type="text" name="email"/>              
       <InputBox placeholder="Mobile" type="text" name="mobile"/>              
       <InputBox placeholder="Password" type="text" name="password"/>              
       <InputBox placeholder="Confirme Password" type="text" name="confirmepassword"/>              
        <div  className='relative w-full '>
        <input name='avatar' onChange={(e)=>setPreviewImg(URL.createObjectURL(e.target.files[0]))}  type="file" className="relative z-[5]  file-input bg-transparent focus:outline-none file-input-bordered file-input-accent w-full " />

        <div className="absolute h-full opacity-50 text-xs  md:text-base whitespace-nowrap  w-3/6 top-0 right-0 flex justify-end pr-5 items-center">
           {!previewImg && <p>Choose a profile picture</p>}  
         </div>  
         </div>
        <button type='submit' className='btn btn-info text-white'>Add user</button>              
      </form>   
      </div>        
    </div>
  )
}
