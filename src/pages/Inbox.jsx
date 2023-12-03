import axios from "axios";
import { isEmpty, uniqBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuth } from "../Context/Authntication";
import ChatEnd from "../components/Content/Inbox/ChatEnd";
import ChatStart from "../components/Content/Inbox/ChatStart";
import MessageSendBox from "../components/Content/MessageSendBox";

export default function Inbox() {
  const { user } = useAuth();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const { state } = useLocation();
  const {convertionID} = state;
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/inbox/message/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (!isEmpty(res.data.data)) {
            setMessages(res.data.data);
          } else {
            setMessages([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    const inbox = document.getElementById("inbox");
    inbox.scrollTo(0, inbox.scrollHeight - inbox.offsetHeight);
  }, [messages, id]);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    socket.on("new_message", (newmessage) => {  
      if (convertionID === newmessage.ConvertionID) {
        setMessages((old) => uniqBy([...old, newmessage.message],"_id")); 
      }
    });
    return ()=> socket.close()
  }, [convertionID]);

  return (
    <>
      <div className="header h-20 sticky top-0 bg-slate-700 flex justify-between items-center px-8">
        {state && <h1 className="text-xl md:text-3xl">{state.participate.name}</h1>}
        <h1 className="text-xl md:text-3xl hover:scale-110 transition-all cursor-pointer">
          <i className="fa-solid fa-trash-can"></i>
        </h1>
      </div>
      <div
        id="inbox"
        className="inbox custom_scrollbar overflow-auto  p-4 h-[70%] md:h-[80%]"
      >
        {messages.length > 0 &&
          messages.map((ele, ind) => {
            if (ele.sender._id === user._id) {
              // <ChatEnd/>
              return (
                
                <ChatEnd 
                 key={ind}
                  message={{
                    newmessage: ele.message,
                    senddate: ele.last_update,
                    attachments: ele.attachments,
                  }}
                />
              );
            } else {
              return (
                <ChatStart  
                key={ind}
                  message={{
                    sender: ele.sender,
                    senddate: ele.last_update,
                    newmessage: ele.message,
                    attachments: ele.attachments,
                  }}
                />
              );
            }
          })}
      </div>
      <div className="header h-20 sticky bottom-0 bg-slate-700">
        {id && <MessageSendBox recever={id} />}
      </div>
    </>
  );
}