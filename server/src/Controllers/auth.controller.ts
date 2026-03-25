import {Request,Response,NextFunction} from 'express';
import { userauthModel } from '../models/auth.model';
import bcrypt from 'bcrypt';
import { userSchemaVal,userloginSchema,verifyOtpSchema } from '../validation/user.validation';
import { JWT_SECRET,SALT_ROUND } from '../configs/env.config';
import jwt from 'jsonwebtoken';
import { sendOtpService } from '../utils/otp.service';
import { checkOtpModel } from '../models/otp.model';
import { authRequest } from '../types/auth.types';

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
    const checkUserName=await userauthModel.findOne({userName});
    if(checkUserName){
        return res.status(400).json({
            success:false,
            message:"userName already taken",
        });
    }
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
        sameSite:"lax",
        secure:false, 
        maxAge:7*24*60*60*1000,
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
        sameSite:'lax',
        secure:false,
        maxAge:7*24*60*60*1000,
    });

    return res.status(200).json({
        success:true,
        message:"already registered",
    })
}catch(error){
    next(error);
}
}










export const verifyOtp=async(req:authRequest,res:Response,next:NextFunction)=>{
    try{
        const user=req.user;
        const email=user?.email;
    const parsed=verifyOtpSchema.safeParse(req.body);
    if(!parsed.success){
        const issue=parsed.error.issues[0];
        return res.status(400).json({
            success:false,
            message:issue.message,
        });
    }
    const {otpValue}=parsed.data;
    const record=await checkOtpModel.findOne({email});
    if(!record){
        return res.status(404).json({
            success:false,
            message:"otp not found",
        });
    }
    if(record.otpExpiresTime && Date.now()>record.otpExpiresTime.getTime()){
        return res.status(400).json({
            success:false,
            message:"otp expired",
        });
    }
    if(record.otpValue!==Number(otpValue)){
        return res.status(400).json({
            success:false,
            message:"invalid otp number entered",
        });
    }
    return res.status(200).json({
        success:true,
        message:"successfull verified",
    });
}catch(err){
    next(err);
}
}










export const resendOtpToUser=async(req:authRequest,res:Response,next:NextFunction)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized",
            });
        }
        const email=user?.email;
        if(!email){
            return res.status(404).json({
            success:false,   
            message:"something went wrong",
            });
        }
        try{
        await sendOtpService(email);
        return res.status(200).json({
            success:true,
            message:"successfully send",
        })
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
}









export const checkTok=async(req:authRequest,res:Response)=>{
return res.status(200).json({
    success:true,
    message:'successfull',
    data:req.user,
});
}