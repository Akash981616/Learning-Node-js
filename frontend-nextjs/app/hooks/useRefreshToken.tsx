"use Client";
import React from "react";
import axios from "axios";
import { baseUrl } from "../util";
import AuthContext from "../context/AuthContext";
const useRefreshToken = () => {
  const {auth,setAuth}:any= React.useContext(AuthContext)
  const refresh = async () => {
    const { data } = await axios.get(`${baseUrl}/user/refreshToken`, {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      console.log("prev", JSON.stringify(prev));
      console.log("response Auth", data);
      return { ...prev, accessToken: data.accessToken };
    });
  };
  return refresh;
};

export default useRefreshToken;
