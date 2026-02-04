//! IMPORTS
import Task from "../models/Task.js";

//! CREATE TASK
export const createTask= async (req, res) => {
    try {
        const { title } = req.body;

        // validation
        if (!title || title.trim() === "") {
            return res.status(400).json({
                status: false,
                message: "Task title is required",
            });
        }

        //? Writing our data into the taskdatabase 
        const newTask = await Task.create({
            title: title.trim(),
            user: req.user.id, // coming from auth middleware
        });

        res.status(201).json({
            status: true,
            message: "Task created successfully",
            data: newTask,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};

//! GET THE TASK
export const getTask= async (req,res)=>{
    try{
        let tasks;

        if(req.user.role==='admin'){
            tasks=await Task.find().populate('user','name email');
        }
        else{
            tasks=await Task.find({user:req.user.id});
        }

        res.status(200).json({
            status: true,
            message: "Tasks fetched successfully",
            data: tasks,
        });
    } 

    catch(err){
        res.status(500).json({
            status: false,
            message: "Server error",
            error:err.message
        });
    } 
};

//! DELETE TASKS
export const deleteTask= async(req,res)=>{
    try{
        const taskId = req.params.id;
        const user = req.user; // comes from authMiddleware

        const task=await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: false, 
                message: "Task not found or unauthorized",
            });
        }

        if (user.role !== "admin" && task.user.toString() !== user.id) {
            return res.status(403).json({
                status: false,
                message: "You are not allowed to delete this task",
            });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            status: true,
            message: "Task deleted successfully",
        });
    }

    catch(err){
        res.status(500).json({
            status: false,
            message: "Server error",
            error:err.message
        });
    }
};
