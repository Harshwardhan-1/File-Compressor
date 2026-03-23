import mongoose from 'mongoose';
import { Document,Types } from 'mongoose';
import {minLength,maxLength} from 'zod';

export interface IUser extends Document{
    _id:Types.ObjectId,
    name:string,
    userName:string,
    email:string,
    password:string,
     role?:string,
    createdAt?:Date,
}



export const userSchema=new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:[true,'name is requiered'],
        trim:true,
        minLength:[3,'name must be atleast 3 characters'],
        maxLength:[20,'name cannot be more than 20 characters'],
    },
    userName:{
        type:String,
        unique:true,
        required:[true,'userName is requierd'],
        trim:true,
        minLength:[5,'userName must be of 3 characters'],
        maxLength:[20,'userName cannot be more than 20 characters'],
    },
    email:{
        type:String,
        lowercase:true,
        required:[true,'email field cannot be empty'],
        match:[/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password field cannot be empty'],
        minLength:[4,'password must be atleast 4 characters'],
        maxLength:[20,'password cannot be more than 20 characters'],
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
},
{timestamps:true},
)


export const userauthModel=mongoose.model<IUser>('RegisterdUser',userSchema);