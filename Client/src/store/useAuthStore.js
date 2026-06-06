import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"
import { useChatStore } from "./useChatStore"
const BASE_URL="http://localhost:3010"
export const useAuthStore=create((set,get) => ({
  authUser: null,
  isSigningUp:false,
  isLoggingIn:false,
  isUpdatingProfile:false,
  isCheckingAuth:true,
  onlineUsers:[],
  socket:null,
  checkAuth:async ()=>{
     try {
        const res= await axiosInstance.get("/auth/check")
        set({authUser: res.data});
        get().connectSocket();   // calling get method of zustand to get access the variable

     } catch (error) {
        console.log("error checking auth:", error);
        set({authUser: null});
     }
     finally{
        set({isCheckingAuth: false});
     }
  
  },

  signup: async (userData) => {
   set({isSigningUp: true});
   try {
     const res = await axiosInstance.post("/auth/signup", userData);
     set({authUser: res.data});
     toast.success("Signup successful!");
     get().connectSocket();   // calling get method of zustand to get access the variable

   } catch (error) {
     console.log("error signing up:", error);
     toast.error(error.response.data.message);
   } finally {
     set({isSigningUp: false});
   }
  },
  login: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
      get().connectSocket();   // calling get method of zustand to get access the variable
    } catch (error) {
      console.log("error logging in:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logged out successfully!");
      get().disconnectSocket();
      useChatStore.getState().resetChat();



     }
     catch (error) {
      console.log("error logging out:", error);
      toast.error("Logout failed!");
    }
  },
  updateProfile:async (data)=>{
    set({isUpdatingProfile: true});
  try {
        const res =await axiosInstance.put("/auth/update-profile", data);
        set({authUser: res.data});
        toast.success("Profile updated successfully!");

  } catch (error) {
    console.log("error updating profile:", error);
    toast.error("Failed to update profile!");
  }
  finally {
    set({isUpdatingProfile: false});
  }

},
  connectSocket: () => {
   const {authUser} = get();
   if(!authUser || get().socket?.connected) return;
   const socket = io(BASE_URL, {
     query: { userId: authUser._id },
   });
   socket.connect();
   set({ socket:socket });
   socket.on("getOnlineUsers", (userIds) => {
     set({ onlineUsers: userIds });
   });
  },
  disconnectSocket: () => {
   if (get().socket?.connected) get().socket.disconnect();
  },

}))