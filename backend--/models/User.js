import mongoose from "mongoose";

//! SCHEMA
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true });

//! MODEL
const User=mongoose.model("User",userSchema);

export default User;
