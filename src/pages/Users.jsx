import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../components/Content/Users/UserRow";
import "../styles/table.scss";
import { useAuth } from "../Context/Authntication";
export default function Users() {
  const {user} = useAuth()
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true })
      .then((res) => {
        if (res.data.users) {
          setUsers(res.data.users);
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <>
    {user.role === "admin" ? <><div className="overflow-x-auto custom_scrollbar table-pin-rows  h-[90%]">
      
        <table className="table w-full ">
          {/* head */}
          <thead className="">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Contact info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((ele, ind) => {
                return <UserRow key={ele._id} userdata={ele} />;
              })}
          </tbody>
        </table>
      </div>
      <div className="flex h-[10%] items-center justify-center bg-slate-700 px-5">
        <Link to="/adduser">
          <button className="btn hover:bg-slate-600  border-none transition-all duration-300 bg-slate-800 ">
            <i className="fa-solid fa-circle-plus"></i> Add new user
          </button>
        </Link>
      </div></>
      : <div className="h-full flex  w-full justify-center items-center">
        <h1 className="text-5xl max-w-xl text-center">You are not allow for view users page </h1>
      </div>
    }    
    </>
  );
}
