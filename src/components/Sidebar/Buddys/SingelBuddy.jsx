/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import moment from "moment";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

export default function SingelBuddy({ ele, convertionID }) {
  const [data, setdata] = useState(ele);
  const pusher = new Pusher("a000b8eeb634d3351df4", {
    cluster: "ap2",
  });
  useEffect(() => {
    var channel = pusher.subscribe("chitChat");
    channel.bind("new-message", function (newmessage) {

      if (convertionID === newmessage.ConvertionID) {
        setTimeout(() => {
          setdata((old) => ({
            ...old,
            lastmeassage: newmessage.message.message,
            lastmeassagedate: newmessage.message.updatedAt,
          }));
        }, 500);
      }
    });
  }, []);

  const { avatar, name, lastmeassagedate, lastmeassage } = data || {};
  return (
    <div className="buddy  justify-center cursor-pointer  flex lg:gap-4 p-4">
      <div data-tip={name} className="ml-1 tooltip-right  lg:ml-0 avatra w-20">
        <img
          className="h-10 w-12 md:h-16 object-cover border-2  md:w-16 rounded-full"
          src={import.meta.env.VITE_API_URL_IMG + "/avatars/" + avatar}
          alt=""
        />
      </div>
      <div className="lastmessage hidden lg:block w-full">
        <div className="useranme flex gap-2   justify-between w-full">
          <p className="date text-lg whitespace-normal">{name.slice(0, 10)}</p>
          <p className="date text-xs">
            {lastmeassagedate &&
              moment.utc(lastmeassagedate, "YYYYMMDDHHmmss").fromNow()}
          </p>
        </div>
        <div className="lastmessage">
          <p className="mt-1 text-sm">{lastmeassage}</p>
        </div>
      </div>
    </div>
  );
}
