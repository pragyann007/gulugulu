import { Request, Response, NextFunction } from "express";
export const asynHandler = (fn:Function)=>async(req:Request,res:Response,next:NextFunction)=>{

    try {
        await fn(req,res,next)
    } catch (error) {
        next(error)
    }

    

}