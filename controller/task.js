import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js"

export const newTask = async(req,res,next) =>{

 try{
    const {title,description} = req.body;

    await Task.create({
        title,description,user:req.user
    })

    res.status(201).json({
        success:true,
        message:"Task added Successfully"

    })
 }catch(error){
    next(error)
 }
}

export const getMyTask = async(req,res,next) =>{

  try {
    const userId = req.user._id

    const tasks = await Task.find({user:userId})

    res.status(200).json({
        success: true,
        tasks
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async(req,res,next) =>{

try {
    const taskId = await Task.findById(req.params.id)

    if(!taskId) return next(new ErrorHandler())

    await taskId.deleteOne()

    res.status(200).json({
        success: true,
        message: "Task Deleted."
    })
} catch (error) {
    next(error)
}
    
}

export const updateTask = async(req,res,next) =>{

   try {
    const {id} = req.params

   const tasks = await Task.findById(id)

   if(!tasks) return next(new ErrorHandler(""))

   tasks.isCompleted = !tasks.isCompleted

   await tasks.save()

    res.status(200).json({
        success: true,
        message: "Task Updated."
    })
   } catch (error) {
    next(error)
   }

}