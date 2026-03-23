import express  , {Request , Response, } from "express";
import { FRONTEND_URL } from "./configs/env.config";
import cookieParser from "cookie-parser";
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

import { userauthRoutes } from "./Routes/user.routes.";

app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})

app.use('/api/v1',userauthRoutes);

export default app;