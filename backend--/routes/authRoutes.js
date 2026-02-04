//? THIS WILL HANDLE THE 
//?    a) REGISTER USER
//?    b) LOGIN USER

//! IMPORTS
import express from 'express';
import { registerUser,loginUser } from '../controller/authController.js';

const router=express.Router();

//? Registering the user
router.post('/register',registerUser);

//? Login the user
router.post('/login',loginUser);

export default router;