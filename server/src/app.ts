import express  , {Request , Response, } from "express";
import { FRONTEND_URL } from "./configs/env.config";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from 'cors';
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:FRONTEND_URL,
  methods:['GET','POST','PUT','DELETE'],
  credentials:true,
}));
app.use('/uploads',express.static('uploads'));
app.use('/uploadsCom',express.static('uploadsCom'));
import { userauthRoutes } from "./Routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { fileUpload } from "./Routes/file.upload.routes";

app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})

app.use('/api/v1',userauthRoutes);
app.use('api/v1',fileUpload);
app.use(errorMiddleware);

export default app;