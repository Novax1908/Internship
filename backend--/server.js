//! IMPORTS
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js'


dotenv.config();
const app=express();

//!MIDDLEWARE
app.use(cors());
app.use(express.json()); 

//! ROUTES
// app.get('/api/protected',authMiddleware,(req,res) =>{
//     res.status(200).json({
//         status:true,
//         message:"you have successfully accessed a protected route",
//         user:req.user
//     })
// });

app.use('/v1/api/auth',authRoutes);
app.use('/v1/api/tasks',taskRoutes);

//! CONNECTING TO THE MONGOOSE

const MONGO_URI=process.env.MONGO_URI 

//! CONNECTION
mongoose.connect(MONGO_URI).then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err) =>{
    console.log("MongoDb Not connected",err.message);
});

const PORT=process.env.PORT ||5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);  
})
