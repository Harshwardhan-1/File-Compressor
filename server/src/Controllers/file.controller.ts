import { authRequest } from "../types/auth.types";
import {Request,Response,NextFunction} from 'express';
import { userfilevalidation } from "../validation/userfile.validation";
import { imageHelper } from "../helpers/helper.image";


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
        const inputpath=file?.path;
        const outputpath=`uploadsCom/${file?.filename}`;
        if(!inputpath || !outputpath || !file?.mimetype){
            return res.status(400).json({
                success:false, 
                message:"file compression failed",
            });
        }
        const {title}=parsed.data;
        if(title=== 'Compress image' ||  title=== 'Compress JPG'){
            const mimetype=file?.mimetype;
            const fileSize=file?.size;
         const result=await imageHelper({title,inputpath,outputpath,mimetype,fileSize});
           return res.status(200).json({ 
            success:true,
            message:"File Compressed Successfully",
            data:result,
           })
        }
        
    }catch(err){
        next(err);
    }
}