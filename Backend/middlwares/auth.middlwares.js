import { User } from "../models/user.model.js";
import { apiErrors } from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const auth= asyncHandler(async(req,_,next)=>{
   try {
    const token = req.cookies?.accestoken || req.headers?.authorization?.split(" ")[1]
    console.log(token)
    if (!token) {
      
     throw new apiErrors(401,"Authentication failed")
    } 
 
     const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   
     if (!decodeToken) {
        throw new apiErrors(401,"Invaild accesToken")
     }
 
     const user =await User.findById(decodeToken?._id).select("-password -refreshToken")

     if (!user) {
      throw new apiErrors(401,"Invaild acces token")
     }
 
     req.user=user
 
     next()
   } catch (error) {
    console.log(error)
     throw new apiErrors(401,"Invalid last accestoken",error)
   }

    


})