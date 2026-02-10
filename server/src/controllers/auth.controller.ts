import { Request,Response } from "express"
import { asynHandler } from "../utils/asynHandler"
import { loginService, registerService } from "../services/authServices";

interface User extends Request{
    user?:{
        id:string,
        name:string,
        email:string
    }
}

export const register = asynHandler(async(req:Request,res:Response)=>{

    const {name,email,password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields"
        })
    }

    const registeredUser = await registerService({name,email,password});

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:registeredUser

    })
    

})
export const login = asynHandler(async(req:Request,res:Response)=>{

 const {email,password} = req.body;
 
 if(!email || !password){
    return res.status(400).json({
        success:false,
        message:"Please provide all the fields"
    })
 }

 const loggedInUser = await loginService({email,password});

 res.cookie("token", loggedInUser.token)
 res.status(200).json({
    success:true,
    message:"User logged in successfully",
    user:loggedInUser.user,
    token:loggedInUser.token
 })



})

export const logout = asynHandler(async(req:Request,res:Response)=>{

    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })

})

export const getCurrentUser = asynHandler(async(req:User,res:Response)=>{

    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
    console.log(user);

})