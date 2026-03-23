import {Request,Response,NextFunction} from 'express';
import { userauthModel } from '../models/auth.model';
import bcrypt from 'bcrypt';
import { userPlayLoad } from '../types/auth.types';
import { userSchemaVal } from '../validation/user.validation';
import { JWT_SECRET } from '../configs/env.config';

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

}catch(error){
    next(error);
}
}