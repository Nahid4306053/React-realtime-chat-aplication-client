import React, { useEffect, useState } from 'react'
import ConvertionRow from '../components/Content/Convertion/ConvertionRow'
import axios from 'axios'

export default function AddConvertion() {
 const [keyword,setkeyword] = useState() 
 const [searchedUser,SetsearchedUser] = useState([])
  const searchUser = (word) =>{
    setkeyword(word.target.value)
    if(word.key === "Backspace"){
      setkeyword(word.target.value)
      console.log(word.target.value)
    }

  } 
  useEffect(() => {
   if(keyword){
    const debounceTimeout = setTimeout(() => {
      axios.post(`${import.meta.env.VITE_API_URL}/inbox`,{keyword},{withCredentials:true}).then((res)=> {
        if(res.data.data){ 
         SetsearchedUser(res.data.data)
        }
        else if(res.data.error){
          SetsearchedUser([])
          console.log(res.data.error)
        }
      }).catch((err)=> console.log(err))
      }, 500);
  
      return () => {
        clearTimeout(debounceTimeout);
      };
   }
  }, [keyword]);


  return (
    <div className='p-5'>
      <div className="Header text-center h-40 flex justify-center items-center">
         <h1 className='text-4xl'>Create new convertion</h1>
      </div>
      <div className="search max-w-xl mx-auto mb-10">
      <input onKeyDown={searchUser} onInput={searchUser} type="text" placeholder="Search user"  className="bg-transparent focus:outline-none input input-bordered w-full rounded-none" />
      </div>
      <div className="overflow-x-auto max-w-xl rounded-lg mx-auto bg-slate-700">
      <table className="table">
        <thead className='h-16 text-xl'>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchedUser.length > 0 && searchedUser.map((ele,ind)=>{
            return (  <ConvertionRow user={ele} key={ele._id}/>)
          })
         }
        </tbody>
      </table>
</div>
    </div>
  )
}
