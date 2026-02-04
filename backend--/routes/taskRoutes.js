//* here we are writing the route for adding the task
//* idhar hume user chaiye issleye hum authMiddleware ka use karenge 

//! IMPORTS
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask,getTask,deleteTask } from "../controller/taskController.js";

const router = express.Router();

//! CREATE TASK
router.post("/create", authMiddleware, createTask);

//! TO GET THE TASKS
router.get('/',authMiddleware, getTask)

//! TO DELETE TASKS
router.delete('/:id',authMiddleware , deleteTask)

export default router;
