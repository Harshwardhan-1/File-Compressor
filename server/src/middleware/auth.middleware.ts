import {Request,Response,NextFunction} from 'express';
import { JWT_SECRET } from '../configs/env.config'; 
import { userauthModel } from '../models/auth.model';
import { authRequest } from '../types/auth.types';
import jwt from 'jsonwebtoken';
import { userPlayLoad } from '../types/auth.types';

export const isUserLoggedIn=async(req:authRequest,res:Response,next:NextFunction)=>{
try{
const token=req.cookies.token;
if(!token){
return res.status(401).json({
    success:false,
    message:"token not found",
});
}
const decodedData=jwt.verify((token),JWT_SECRET as string) as userPlayLoad;
const useremail=decodedData.email;
const user=await userauthModel.findOne({email:useremail}).select('-password');
if(!user){
    return res.status(401).json({
        success:false,
        message:"user not found",
    })
}
req.user=user;
next();
}catch(error){
    next(error);
}
}






export const isAdminLoggedIn=async(req:authRequest,res:Response,next:NextFunction)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found",
            });
        }
        const decodedData=jwt.verify(token,JWT_SECRET as string) as userPlayLoad;
        const user=await userauthModel.findOne({email:decodedData.email}).select('-password');
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found",
            })
        }
        if(user.role!== 'admin'){
            return res.status(403).json({
                success:false,
                message:"access denied",
            });
        }
        req.user=user;
        next();
    }catch(error){
        next(error);
    }
}