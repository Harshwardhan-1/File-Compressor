import {Request,Response,NextFunction} from 'express';
import { userPhotoModel } from '../models/userUpload';
import { authRequest } from '../types/auth.types';
import { userFileSchema } from '../validation/userFile.validation';
import fs from 'fs';
import sharp from 'sharp';

export const userFile=async(req:authRequest,res:Response,next:NextFunction)=>{
    try{
const parsed=userFileSchema.safeParse(req.body);
if(!parsed.success){
    const issue=parsed.error.issues[0];
    return res.status(400).json({
        success:false,
        message:issue.message,
    });
}
const {filetype}=parsed.data;
const fileName=req.file?.filename;
const user=req.user;
const email=user?.email;
const uploadFile=req?.file;




if(filetype=== 'Compress image'){
    const meme=uploadFile?.mimetype;
       let image = sharp(uploadFile?.path).resize({ width: 800 });
        if (meme === "image/png") {
        image = image.png({ compressionLevel: 9 }); // png compression
      } else if (meme === "image/jpeg" || meme === "image/jpg") {
        image = image.jpeg({ quality: 60 }); // jpeg compression
      } else if (meme === "image/webp") {
        image = image.webp({ quality: 60 }); // WebP compression
      } else {
        return res.status(400).json({ success: false, message: "Unsupported image format" });
      }
      const compressedBuffer=await image.toBuffer();
      const compressedPath = `uploads/compressed-${uploadFile?.filename}`;
    await fs.promises.writeFile(compressedPath, compressedBuffer);
      return res.status(200).json({
        success:true,
        message:"successfull",
        data:{
            orignal:uploadFile?.path,
            compressed:compressedPath,
        }
      });
}
    }catch(err){
        next(err);
    }
}







// {
//   "fieldname": "userfile",
//   "originalname": "photo.jpg",
//   "encoding": "7bit",
//   "mimetype": "image/jpeg",
//   "destination": "uploads/",
//   "filename": "abc123def.jpg",
//   "path": "uploads/abc123def.jpg",
//   "size": 102400
// }