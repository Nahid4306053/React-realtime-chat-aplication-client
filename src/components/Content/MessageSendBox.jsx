/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import UploadIMG from "../../Utils/UploadIMG";
import { useQueryClient } from "@tanstack/react-query";
import { useConvertion } from "../../Context/ConvertionContext";
import { useRef, useState } from "react";

export default function MessageSendBox({ recever }) {
  const QueryClient = useQueryClient();
  const [atach,setAtach] = useState()
  const [loading,setloading] = useState(false);

  const {getConvertion,Convertions} = useConvertion()
  const sendMessage = async (form) => {
    form.preventDefault();
    setloading(true);
    if (
      form.target.message.value.trim() !== "" ||
      form.target.attachments.files.length > 0
    ) {
      const formdata = new FormData(form.target);
      formdata.append("recever", recever);
      if (form.target.attachments.files.length > 0) {
 
        const img =  form.target.attachments.files[0]
        const uploadIMG = await UploadIMG(img);
       
        if (uploadIMG.data.data.display_url) {
          formdata.set("attachments", [uploadIMG.data.data.display_url]);
        }
      }

      axios
        .post(`${import.meta.env.VITE_API_URL}/inbox/message`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
          
            QueryClient.invalidateQueries(['messages'])  
            getConvertion();
            form.target.reset();
            setloading(false);
            setAtach('')
          }
        })
        .catch((Err) => console.log(Err));
    } else {
      setloading(false);
      alert("Please send something");
    }
  };
  return (
    <>
      {" "}
      <form
        onSubmit={sendMessage}
        className="flex h-full px-4  md:px-10 gap-5 items-center justify-between form"
      >  
      { atach && <div className="w-24 h-24 rounded-lg bg-base-300 absolute -top-[120%] p-2">
        <img className="mt-1 h-full w-full object-cover rounded-lg" src={atach} alt="atach" /></div>}

        <div className="fileuploader">
          <div className="attachment relative w-4 md:w-8 h-12 overflow-hidden flex items-center">
            <input
             onChange={(e)=>setAtach(URL.createObjectURL(e.target.files[0]))}
              type="file"
              className="absolute cursor-pointer z-50  opacity-0"
              name="attachments"
              accept=".jpg, .png, .webp, .jpeg"
              
            />
            <div className="text-xl md:text-3xl">
              <i className="fa-solid fa-paperclip"></i>
            </div>
          </div>
        </div>
        <input
          
          name="message"
          type="text"
          placeholder="Type your words here"
          className="input bg-transparent rounded-none  input-bordered w-full focus:outline-none"
        />
        <button
        disabled={loading ? true : false}
          type="submit"
          className="btn btn-info disabled:btn-info  md:text-2xl text-white"
        >
          {loading ? <span className="loading text-white loading-spinner loading-md"></span> : <i className="fa-solid fa-paper-plane-top"></i>} 
        </button>
      </form>
    </>
  );
}
