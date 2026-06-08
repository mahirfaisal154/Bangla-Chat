import axios from "axios"

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE==="development" ? "http://localhost:3010/api" : "/api",
  withCredentials:true,  //Sends cookies (your JWT) with every request automatically to backend server 
});