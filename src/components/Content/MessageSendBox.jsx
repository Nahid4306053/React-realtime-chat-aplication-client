import axios from "axios";
import React from "react";

export default function MessageSendBox({ recever }) {
  const sendMessage = (form) => {
    form.preventDefault();

    if (
      form.target.message.value.trim() !== "" ||
      form.target.attachments.files.length > 0
    ) {
      const formdata = new FormData(form.target);
      formdata.append("recever", recever);
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
            form.target.reset();
          }
        })
        .catch((Err) => console.log(Err));
    } else {
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
        <div className="fileuploader">
          <div className="attachment relative w-4 md:w-8 h-12 overflow-hidden flex items-center">
            <input
              type="file"
              className="absolute cursor-pointer z-50  opacity-0"
              name="attachments"
              accept=".jpg, .png, .webp, .jpeg"
              multiple
              id=""
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
        <button type="submit" className="btn btn-info btn- md:text-2xl text-white">
          <i className="fa-solid fa-paper-plane-top"></i>
        </button>
      </form>
    </>
  );
}
