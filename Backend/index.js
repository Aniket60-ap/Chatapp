const express= require('express')
// const app=express()
const dotenv= require("dotenv")
const connectDB = require('./config/database')
const userRouter = require('./routes/userRoutes')
const messageRoutes=require("./routes/messageRoutes")
const cors= require('cors')
const cookieParser = require("cookie-parser");
const { app, server } = require('./Socket/Socket');
dotenv.config({})

const PORT= process.env.PORT || 5000
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
const corsOptions={
    origin:'https://chatapp-frontend-49i4.onrender.com',
    credentials:true
}
app.use(cors(corsOptions))

//routes
app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRoutes)


server.listen(PORT,()=>{
    connectDB()
    console.log(`server listen at port ${PORT}`);
})
