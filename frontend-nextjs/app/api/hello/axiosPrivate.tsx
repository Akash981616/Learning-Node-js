import { baseUrl } from "@/app/util";
import axios from "axios";
export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
