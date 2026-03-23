import {Request} from 'express';
import { IUser } from '../models/auth.model';
import { JwtPayload } from 'jsonwebtoken';

export interface userPlayLoad extends JwtPayload{
    usreId:any,
    email:string,
    role:string,
}




export interface authRequest extends Request{
    user?:null | IUser
}