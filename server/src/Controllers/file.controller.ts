import { authRequest } from "../types/auth.types";
import {Request,Response,NextFunction} from 'express';
import { userfilevalidation } from "../validation/userfile.validation";

export const userFile=async(req:authRequest,res:Response,next:NextFunction)=>{
    try{
        const file=req.file;
        const parsed=userfilevalidation.safeParse(req.body);
        if(!parsed.success){
            const issue=parsed.error.issues[0].message;
            return res.status(400).json({
                success:false,
                message:issue,
            });
        }
        
    }catch(err){
        next(err);
    }
}