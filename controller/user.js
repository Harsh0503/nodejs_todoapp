import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async(req,res,next)=>{
try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email})

    if(user) return next(new ErrorHandler("User Already Exist",404))

    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password:hashedPassword})

    sendCookie(user,res,"Registered Successsfully",201)
} catch (error) {
    next(error)
}
}

export const login = async(req,res,next)=>{

try {
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Email or Password.",404))

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password.",404))

     sendCookie(user,res,`Welcome Back ${user.name}`,200)
} catch (error) {
    next(error)
}
}

export const getMyProfile = (req,res,next)=>{
try {
    
    res.status(200).json({
        success:true,
        user:req.user,
    })
} catch (error) {
    next(error)
}

}

export const getAllUser = async(req,res)=>{};


export const logout = async(req,res)=>{


    res.status(200).cookie("token","",{
        expire:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "development"? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
     }).json({
        success:true,
        user:req.user,
    })

}