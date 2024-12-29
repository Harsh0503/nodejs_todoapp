import express from "express"
import { deleteTask, getMyTask, newTask, updateTask } from "../controller/task.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.post("/new",isAuthenticated, newTask); 

router.get("/my",isAuthenticated, getMyTask); 

router.put("/:id",isAuthenticated, updateTask); 

router.delete("/:id",isAuthenticated, deleteTask); 

export default router