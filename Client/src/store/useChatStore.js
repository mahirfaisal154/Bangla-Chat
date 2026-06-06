import {create} from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";
import {useAuthStore} from "./useAuthStore"
export const useChatStore= create((set, get) => ({
   messages:[],
   users:[],
   selectedUser:null,
   isUsersLoading:false,
   isMessagesLoading:false,



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

      setSelectedUser:async (userId) => {
        set({ selectedUser: userId });
      },

      sendMessage:async (messageData) => {
        try {
          const {selectedUser, messages } = get();
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

          set({ messages: [...messages, response.data] });
        } catch (error) {
          toast.error("Failed to send message");
        }
      },


      subscribeToMessages:()=>{
          const {selectedUser} = get();
          if(!selectedUser) return;
          const socket=useAuthStore.getState().socket; 

          socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id) {
              const { messages } = get();
              set({ messages: [...messages, newMessage] });
            }
          });

      },

      unsubscribeFromMessages:()=>{
         const socket =useAuthStore.getState().socket;
         socket.off("newMessage");

      },

      resetChat: () => {
        set({ selectedUser: null, messages: [] });
      },

}))