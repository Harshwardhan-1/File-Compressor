import mongoose from 'mongoose';
import { Document,Types } from 'mongoose';
import {minLength,maxLength} from 'zod';

export interface IUser extends Document{
    _id:Types.ObjectId,
    name?:string,
    userName?:string,
    email?:string,
    password?:string,
    createdAt?:Date,
    role?:string,
}



export const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is requiered'],
        trim:true,
        minLength:[3,'name must be atleast 3 characters'],
        maxLength:[20,'name cannot be more than 20 characters'],
    },
    userName:{
        type:String,
        required:[true,'userName is requierd'],
        trim:true,
        minLength:[3,'userName must be of 3 characters'],
        maxLength:[20,'userName cannot be more than 20 characters'],
    },
    email:{
        type:String,
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
    createdAt:{
        type:Date,
        enum:['user','admin'],
        default:"user",
    },
},
{timestamps:true},
)


export const userauthModel=mongoose.model('registerdUser',userSchema);