import mongoose from 'mongoose';
import {Document,Types} from 'mongoose';
import { minLength,maxLength } from 'zod';

export interface UserPhoto extends Document{
    _id:Types.ObjectId,
    userName:string,
    email:string,
    uploadCount:Number,
    fileName:string,
    fileType:string,
}


export const userPhotoSchema=new mongoose.Schema<UserPhoto>({
    userName:{
        type:String,
        required:[true,'userName is required'],
        unique:true,
        trim:true,
        minLength:[3,'userName cannot be less than 3 characters'],
        maxLength:[20,'userName cannot be more than 20 characters'],
    },
    email:{
        type:String,
        required:[true,'email field cannot be empty'],
        unique:true,
        trim:true,
         match:[/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    uploadCount:{
        type:Number,
        default:0,
    },
    fileName:{
        type:String,
        required:true,
    },
    fileType:{
        type:String,
        required:[true,'file field cannot be empty'],
    },
})




export const userPhotoModel=mongoose.model<UserPhoto>('userPhoto',userPhotoSchema);