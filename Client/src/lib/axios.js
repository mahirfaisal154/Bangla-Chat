import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api",
  withCredentials:true,  //Sends cookies (your JWT) with every request automatically to backend server 
});