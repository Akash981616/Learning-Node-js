"use client";
import { axiosPrivate } from "../api/hello/axiosPrivate";
import useRefreshToken from "./useRefreshToken";
import React from "react";
import useAuth from "./useAuth";
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {auth}:any = useAuth()
  React.useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};
export default useAxiosPrivate;
