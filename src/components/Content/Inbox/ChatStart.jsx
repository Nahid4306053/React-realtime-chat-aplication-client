/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import moment from "moment";
import React from "react";

export default function ChatStart({ message }) {
  const { sender, newmessage, senddate, attachments } = message || {};
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={import.meta.env.VITE_API_URL_IMG + "/avatars/" + sender.avatar}
          />
        </div>
      </div>
      <div className="chat-header  mb-2">
        {sender.name}

      </div>      
      <div className="chat-bubble min-w-[80px] flex justify-end chat-bubble-secondary">
        {newmessage}
        {attachments.length > 0 && (
          <div className="attachments mt-4 max-w-sm">
            {attachments.map((ele, ind) => {
              return (
                <img
                className="w-full"
                  key={ind}
                  src={import.meta.env.VITE_API_URL_IMG + "/attachment/" + ele}
                  alt="atachment"
                />
              );
            })}
          </div>
        )}
      </div>
       <div className="chat-footer   mt-2">
       <time className="text-xs opacity-50 ">
          {" "}
          {senddate &&
            moment.utc(senddate, "YYYYMMDDHHmmss").fromNow()}
        </time>

      </div>
    </div>
  );
}
