import express from "express";
import { url } from "node:inspector";
import Site from "../models/sites.model";
import axios from "axios";
import User from "../models/user.models";

export const postsitesService = async(url:string,ownerId:string)=>{

    const isSiteExist = await Site.findOne({url});

    if(isSiteExist){
        throw new Error("Site already exists")
    }

    const user = await User.findById(ownerId);

    if(!user){
        throw new Error("User not found")
    }




    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


 
    const site = await Site.create({
        url,
        ownerId,
        verificationToken,
        verified:false
    })

    user.sites.push(site._id);
    await user.save();
    

    return site;


}

