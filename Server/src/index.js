import express from "express"
import authroutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import messageroutes from "./routes/message.route.js"
import cors from "cors"
import { app,server,io } from "./lib/socket.js"

import path from "path"

dotenv.config()
const ___dirname=path.resolve()
//const app=express()
app.use(express.json({ limit: "10mb" }))


app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}));

app.use("/api/auth",authroutes)
app.use("/api/messages", messageroutes)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../client/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"))
  })
}
const PORT=process.env.PORT
server.listen(PORT,async () => {
    await connectDB()

    console.log(`Server is running on port ${PORT}`)
})  
//