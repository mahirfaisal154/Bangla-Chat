import Navbar from "./components/navbar";
import { Route,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { axiosInstance } from "./lib/axios";
import {useAuthStore} from "./store/useAuthStore.js"
import { useEffect } from "react";
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
const App = () => {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
      useEffect(()=>{
        checkAuth();
      }, [checkAuth]);  
      console.log({authUser});
      if(isCheckingAuth && !authUser)  {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin" />
            </div>
        );
      }
  return (
    <div>
           <Toaster/>    

    <Navbar/>
    <Routes>
      <Route path="/" element={authUser? <HomePage/>: <navigate to="/login" /> } />  
      <Route path="/signup" element={!authUser?<SignUpPage/> :<navigate to="/" />}  />  
      <Route path="/login" element={!authUser?<LoginPage/>:<navigate to="/"/>} />  
      <Route path="/profile" element={authUser?<ProfilePage/>:<navigate to="/login"/>} />  
      <Route path="/settings" element={<SettingsPage/>} />  

      
    </Routes>
    </div>
  )
};

export default App 
