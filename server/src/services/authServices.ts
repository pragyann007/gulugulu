import User from "../models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// my .env file has the JWT_SECRET variable but it is not acessing .env 
dotenv.config();
// solve ts issue for process.env.JWT_SECRET possibly being undefined
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const secret:string = process.env.JWT_SECRET


interface User {
    name?: string;
    email: string;
    password: string;
}
export const registerService = async({name,email,password}:User)=>{

    const user = await User.findOne({email});
    if(user){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10); 


    const newUser = new User({
        name,
        email,
        password:hashedPassword
    });

    await newUser.save();
    return newUser;



}

export const loginService = async({email,password}:User)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not found");
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    const payload = {
        id:user._id,
        name:user.name,
        email:user.email
    }
    const token = jwt.sign(payload, secret , {expiresIn:"7d"});

    return {user,token};



}