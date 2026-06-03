import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
export const useAuthStore=create((set) => ({
  authUser: null,
  isSigningUp:false,
  isLoggingIn:false,
  isUpdatingProfile:false,
  isCheckingAuth:true,
  checkAuth:async ()=>{
     try {
        const res= await axiosInstance.get("/auth/check")
        set({authUser: res.data});
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
    } catch (error) {
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

}))