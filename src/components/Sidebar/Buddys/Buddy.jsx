/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import teacherm5 from "/teacher-m-5.png"
import axios from 'axios';
import { isEmpty, map } from 'lodash';
import moment from 'moment/moment';
import { Link, useLocation } from 'react-router-dom';
// import { io } from 'socket.io-client';
import SingelBuddy from './SingelBuddy';
import { useConvertion } from '../../../Context/ConvertionContext';
export default function Buddy() {
  const {getConvertion,Convertions} = useConvertion()

 const {pathname} = useLocation()
 const currentchat = pathname.includes("/inbox/") ? pathname.split("/inbox/")[1] : ""
   useEffect(()=>{
    getConvertion()
   },[])    

   const handelActivechat = (id) =>{
     const childrens = document.getElementById("buddys").children;
     for(let child of childrens){
        child.classList.remove('bg-[#1b283eb8]');   
        child.classList.add('bg-[#27354d]');   
     }
     document.getElementById(id).classList.remove("bg-[#27354d]");
     document.getElementById(id).classList.add("bg-[#1b283eb8]");
     
   }

  return (   
    <>
     {/*bg-[#1b283eb8] active convertion color  */}
    <div id='buddys' className="buddys overflow-auto">  
     {Convertions && 
      
      Convertions.map((ele)=>{
       const {name , _id , avatar , lastmeassage ,lastmeassagedate } = ele.participate || {} 
  
        return (
           <div onClick={()=> handelActivechat(_id)}  key={_id} id={_id} className={`border-slate-700 ${currentchat === _id ? "bg-[#1b283eb8]" : "bg-[#27354d]"}  border-b`}>
            
            <Link state={{convertionID:ele._id , participate:ele.participate}} to={`inbox/${ _id}` }>
             <SingelBuddy ele={ele.participate} convertionID={ele._id}/> 
           </Link>
           </div>
        )
     })
    
      
       }    
   </div>
    </>
  )
}
