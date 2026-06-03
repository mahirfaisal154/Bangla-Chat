import Navbar from "./components/navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage";
import { axiosInstance } from "./lib/axios";
import {useAuthStore} from "./store/useAuthStore.js"
import { useEffect } from "react";
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore.js";
const App = () => {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
    const {theme} = useThemeStore();
      useEffect(()=>{
        checkAuth();
      }, [checkAuth]);
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);  
      console.log({authUser});
      if(isCheckingAuth && !authUser)  {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin" />
            </div>
        );
      }
  return (
    <div data-theme={theme}>
           <Toaster/>    

    <Navbar/>
    <Routes>
      <Route path="/" element={authUser? <HomePage/>: <Navigate to="/login" /> } />
      <Route path="/signup" element={!authUser?<SignUpPage/> :<Navigate to="/" />}  />
      <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/profile"/>} />
      <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>} />  
      <Route path="/settings" element={<SettingsPage/>} />  

      
    </Routes>
    </div>
  )
};

export default App 
