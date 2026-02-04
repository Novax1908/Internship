//! IMPORTS

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

//! HANDLING REGISTRATION OF THE USER
export const registerUser= async(req,res) =>{
    try{
        const{name,email,password,role}=req.body;

        //* Checking whether all fields are provided or not
        if(!name || !email || !password){
            return res.status(400).json({
                status:false,
                message:"Give all the details of the user"
            });
        }

        //* checking if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                status:false,
                message: "User already exists" 
            });
        }
        
        //* SO now we have a new user so hash its password
        const hashedPassword= await bcrypt.hash(password,10);

        //* creat the new user with hashed password
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            role:role|| 'user'
        });

        await newUser.save();
        res.status(201).json({
            status:true,
            message: "User registered successfully" 
        });
    }

    catch(err){
        console.error(err.message);
        res.status(500).json({
            status:false, 
            message:err.message
        });
    }
};

//! HANDLING LOGIN OF THE USER
export const loginUser= async(req,res) =>{
    try{
        const {email,password}=req.body;

        //* checking if user exist
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({ 
                status:false,
                message: "User not found" 
            });
        }

        //* we got the user
        const isMatch=await bcrypt.compare(password,user.password); 
        if(!isMatch){
            return res.status(401).json({ 
                status:false,
                message: "Invalid Credentials" 
            });
        }

        //* Password matches- generate a jwt token
        const token= jwt.sign({id:user._id,role:user.role,email:user.email} ,process.env.JWT_SECRET,{expiresIn:"1d"});

        //* Send response
        res.status(200).json({
            status:true,
            message: "Login successful",
            token,
            role: user.role
        });
        
    }

    catch(err){
        res.status(500).json({ 
            status:false,
            message: `Error is: ${err.message}`
        });
    }
};