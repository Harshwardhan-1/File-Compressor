import z from 'zod';
import {minLength,maxLength} from 'zod';

export const userSchemaVal=z.object({
    name:z.string().trim().min(3,'name must be atleast 3 characters'),
    userName:z.string().trim().min(5,'userName must be atleast 5 charcters'),
    email:z.string().email('invalid email format').nonempty('email field cannot be empty'),
    password:z.string().min(4,'password must be atleast 4 characters'),
})



export const userloginSchema=z.object({
    email:z.string().email('invalid email format').nonempty('email field cannot be empty'),
    password:z.string(),
})


export const verifyOtpSchema=z.object({
    otpValue:z.string().min(6,'otp field must have atleast 6 characters').nonempty('otp field cannot be empty'),
})