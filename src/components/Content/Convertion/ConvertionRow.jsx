import axios from "axios";
import React from "react";
import { useConvertion } from "../../../Context/ConvertionContext";
import { useNavigate } from "react-router-dom";

export default function ConvertionRow({user}) {
   const {name , avatar , _id} = user ||{}  
   const {getConvertion} = useConvertion()
   const  navigate = useNavigate()
   const handelAddConvertion = (participate_id) =>{
    console.log(participate_id)
     if(participate_id){
      axios.post(`${import.meta.env.VITE_API_URL}/inbox/conversion`,{participate_id},{
        headers:{
          "Content-Type":"Application/json"
        },
        withCredentials:true
      }).then((res)=>{
        if(res.data.success){
          getConvertion()
        }
        else if(res.data.error){
          alert(res.data.error)
        }
      })
     }
   }
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={import.meta.env.VITE_API_URL_IMG + "/avatars/" + avatar}
                alt={name}
              />
            </div>
          </div>
        </div>
      </td>
      <td>
        
        <h3 className="text-xl">{name}</h3>
      </td>
      <td>
        <button onClick={()=> handelAddConvertion(_id)} className="btn btn-secondary btn-xs">Add</button>
      </td>
    </tr>
  );
}
