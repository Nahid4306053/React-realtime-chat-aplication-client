import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthProvidor = createContext();

export const useAuth = () => {
  return useContext(AuthProvidor);
};

export default function Authntication({ children }) {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);

  const getCurrentuser = async () => {
    setloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/current`,
        {
          withCredentials:true   
        }  
      );
      const data = response.data;
      if (!data.error) {
        setUser(data.data);
     
        setloading(false);
      } else {
        setUser();
        setloading(false);
      }
    } catch (err) {
      console.log(err);
      setloading(false);
      setUser();
    }
  };
  useEffect(() => {
    getCurrentuser();
    return () => getCurrentuser();
  }, []);

  return (
    <AuthProvidor.Provider value={{ loading, user, getCurrentuser }}>
      {!loading && children}
    </AuthProvidor.Provider>
  );
}
