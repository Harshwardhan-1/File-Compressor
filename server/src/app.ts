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
app.use('/uploads',express.static(path.join(__dirname,"../uploads")));
app.get("/download/:file", (req: Request, res: Response) => {
  const fileName = req.params.file; // compressed-xxx.jpeg
  const filePath = path.join(__dirname, "../uploads", fileName); // server/uploads folder
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error downloading file");
    }
  });
});
import { userauthRoutes } from "./Routes/user.routes";
import { userUploadFile } from "./Routes/user.upload";
import { errorMiddleware } from "./middleware/error.middleware";

app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})

app.use('/api/v1',userauthRoutes);
app.use('/api/v1',userUploadFile);
app.use(errorMiddleware);

export default app;