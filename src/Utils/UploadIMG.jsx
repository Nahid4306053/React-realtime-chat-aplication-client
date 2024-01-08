
import axios from 'axios'


export default function UploadIMG(file) {
  const formdata = new FormData()                  
    formdata.append('image',file) 
  

  return  axios.post(import.meta.env.VITE_IMGBB_UPLOAD_URL,formdata,{ headers:{ "Content-Type":"multipart/form-data" } })
  
}
