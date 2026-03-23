import mongoose from 'mongoose';
import { MONGO_URI } from '../configs/env.config';


export const connectDb=async():Promise<void>=>{
    try{
    await mongoose.connect(MONGO_URI as string);
    console.log('mongoDb connected');
    }catch(err){
        console.log("Error",err);
        process.exit(1);
    }
}