import mongoose from 'mongoose';
import {Document,Types} from 'mongoose';

export interface IOtp extends Document{
    _id:Types.ObjectId,
    email:string,
    otpValue:Number,
    otpCreateTime?:Date,
    otpExpiresTime?:Date,
    createdAt?:Date,
}




export const checkOtpSchema=new mongoose.Schema<IOtp>({
    email:{
        type:String,
        required:[true,'email is required'],
         match:[/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        trim:true,
        unique:true,
    },
    otpValue:{
        type:Number,
        required:[true,'otp field cannot be empty'],
        minLength:[6,'enter proper otp number'],
    },
    otpCreateTime:{
        type:Date,
        default:Date.now(),
    },
    otpExpiresTime:{
        type:Date,
        default:Date.now(),
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
},
{timestamps:true},
)




export const checkOtpModel=mongoose.model<IOtp>('userOtp',checkOtpSchema);