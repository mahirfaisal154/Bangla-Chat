import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken}from "../lib/utils.js"
import cloudinary from "../lib/claudinary.js";


export const signup= async (req, res) => {
const {fullname, email, password} = req.body;
    try {
        if(!fullname || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }
        if(email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({message: "Please enter a valid email"})
        }
         const user= await User.findOne({email})
         if(user) {
            return res.status(400).json({message: "User already exists"})
         }
          const salt=await bcrypt.genSalt(15)
          const hashedPassword=await bcrypt.hash(password, salt)
          const newUser= new User({
            fullname,
            email,
            password: hashedPassword
          })
         if(newUser)
         {
            //generate jwt token here 
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                message: "User created successfully",
                _id:newUser.id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilepic:newUser.profilepic


            });


         }
         else{
            res.status(400).json({message: "Failed to create user"})
         }

       
} catch (error) {
    console.error(error)
    res.status(500).json({message: "Internal server error"})
}
}





export const login= async(req, res) => {
const {email,password} = req.body;
    try {
     const user=await User.findOne({email})
     if(!user){
        return res.status(400).json({message: "Invalid credentials"})
      }
      const isMatch=await bcrypt.compare(password, user.password)
      if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
      }
      generateToken(user._id, res)
      res.status(200).json({
        message: "Login successful",
        _id:user.id,
        fullname:user.fullname,
        email:user.email    
      })
} catch (error) {
    console.error(error)
    res.status(500).json({message: "Internal server error"})
}
}






export const logout= (req, res) => {
try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "Logout successful"})
} catch (error) {
    console.error(error)
    res.status(500).json({message: "Internal server error"})
}
}

export const updateProfilePicture= async (req, res) => {

    try {
        const {profilepic} = req.body;
        const userID=req.user._id;
        if(!profilepic){
            return res.status(400).json({message: "Profile picture is required"})
        }
        const uploadResponse=await cloudinary.uploader.upload(profilepic)
        const updatedUser=await User.findByIdAndUpdate(userID,{profilepic:uploadResponse.secure_url},{new:true})
        res.status(200).json({
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            profilepic: updatedUser.profilepic,
            createdAt: updatedUser.createdAt,
        })
    } catch (error) {
        console.log("Error updating profile picture :", error)
        res.status(500).json({message: "Internal server error"})
    }
}


export const checkAuth= async (req, res) => {
try {
    const user = req.user;
    res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic,
        createdAt: user.createdAt,
    })
} catch (error) {
    console.log("Error checking auth:", error)
    res.status(500).json({message: "Internal server error"})
}
}