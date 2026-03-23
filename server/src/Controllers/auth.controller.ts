import {Request,Response,NextFunction} from 'express';
import { userauthModel } from '../models/auth.model';
import bcrypt from 'bcrypt';
import { userSchemaVal,userloginSchema,verifyOtpSchema } from '../validation/user.validation';
import { JWT_SECRET,SALT_ROUND } from '../configs/env.config';
import jwt from 'jsonwebtoken';
import { sendOtpService } from '../utils/otp.service';
import { checkOtpModel } from '../models/otp.model';

export const RegisteredUser=async(req:Request,res:Response,next:NextFunction)=>{
try{
    const parsed=userSchemaVal.safeParse(req.body);
    if(!parsed.success){
        const issue=parsed.error.issues[0];
        return res.status(400).json({
            success:false,
            message:issue.message,
        })
    }
    const {name,userName,email,password}=parsed.data;
    const checkUser=await userauthModel.findOne({email});
    if(checkUser){
        return res.status(409).json({
            success:false,
            message:"email already exist with this account",
        });
    }
    const salt=await bcrypt.genSalt(Number(SALT_ROUND));
    const hashed=await bcrypt.hash(password,salt);
    const createUser=await userauthModel.create({
    name,
    userName,
    email,
    password:hashed,
    role:"user",
});
if(!createUser){
    return res.status(400).json({
        success:false,
        message:"error creating user",
    });
}
    const token=jwt.sign({userId:createUser._id,email:email,role:createUser.role},JWT_SECRET as string);
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"none",
        secure:true, 
        maxAge:7*24*60*60*1000,
        partitioned:true,
    });
    res.status(201).json({
        success:true,
        message:"user created successfully",
    });
}catch(error){
    next(error);
}
}













export const alreadyRegisteredUser=async(req:Request,res:Response,next:NextFunction)=>{
try{
    const parsed=userloginSchema.safeParse(req.body);
    if(!parsed.success){
        const issue=parsed.error.issues[0];
        return res.status(400).json({
            success:false,
            message:issue.message,
        });
    }
    const {email,password}=parsed.data;
    const oldUser=await userauthModel.findOne({email});
    if(!oldUser){
        return res.status(401).json({
            success:false,
            message:"user not found",
        });
    }
    const checkPass=await bcrypt.compare(password,oldUser.password);
    if(!checkPass){
        return res.status(400).json({
            success:false,
            message:"password is incorrect",
        })
    }

try{
    await sendOtpService(email);
}catch(err){
    next(err);
}
    const token=jwt.sign({userId:oldUser._id,email:email,role:oldUser.role},JWT_SECRET as string);
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge:7*24*60*60*1000,
        partitioned:true,
    });

    return res.status(200).json({
        success:true,
        message:"successfully found",
    })
}catch(error){
    next(error);
}
}










export const verifyOtp=async(req:Request,res:Response,next:NextFunction)=>{

    try{
    const parsed=verifyOtpSchema.safeParse(req.body);
    if(!parsed.success){
        const issue=parsed.error.issues[0];
        return res.status(400).json({
            success:false,
            message:issue.message,
        });
    }
    const {otpValue}=parsed.data;
    const checkOtp=await checkOtpModel.findOne({email});
}catch(err){
    next(err);
}
}