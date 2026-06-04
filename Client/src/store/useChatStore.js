import {create} from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";

export const useChatStore= create((set) => ({
   messages:[],
   users:[],
   selectedUser:null,
   isUsersLoading:false,



   getUsers:async () => {
     set({ isUsersLoading: true });
     try {
       const response = await axiosInstance.get("/messages/users");
       set({ users: response.data, isUsersLoading: false });
     } catch (error) {
       toast.error("Failed to fetch users");
     }
     finally{
               set({ isUsersLoading: false });

     }
   },

      getMessages: async(userId)=>{
      set({isMessagesLoading: true});
      try {
       const res=await axiosInstance.get(`/messages/${userId}`) 
       set({ messages: res.data, isMessagesLoading: false });
      } catch (error) {
       toast.error("Failed to fetch messages");
       set({ isMessagesLoading: false });
      }
      finally{
        set({isMessagesLoading: false});
      }

      },
      //todo:optimize it later
      setSelectedUser:async (userId) => {
        set({ selectedUser: userId });
      }

}))