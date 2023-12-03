import axios from 'axios'
import { isEmpty } from 'lodash'
import React, { createContext, useContext, useState } from 'react'
const conversionContext = createContext()
export const useConvertion = () =>{
       return useContext(conversionContext)
}

export default function ConvertionContext({children}) {

   const [Convertions,SetConvertions] = useState()  
   const getConvertion = () =>{
      axios.get(`${import.meta.env.VITE_API_URL}/inbox`,{withCredentials:true}).then(res=>{
       if(!isEmpty(res.data?.conversions)){ 
          SetConvertions(res.data?.conversions)
        }}).catch(err=> console.log(err))              
   }
   const data = { getConvertion,Convertions }
   return (
     <conversionContext.Provider value={data}>
       {children}
     </conversionContext.Provider>
   )
}
