/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import moment from "moment";
import React from "react";

export default function ChatEnd({ message }) {
  const { newmessage, attachments, senddate } = message || [];

  return (
    <div className="chat chat-end mt-2">

      <div className="chat-bubble min-w-[100px] chat-bubble-primary">
        <p>{newmessage}</p>
        {attachments.length > 0 && (
          <div className="attachments max-w-sm mt-4">
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
      <div className="chat-footer mt-1">
        <time className="text-xs opacity-50 mr-2">
          {senddate &&
            moment.utc(senddate, "YYYYMMDDHHmmss").fromNow()}
        </time>
      </div>
    </div>
  );
}
