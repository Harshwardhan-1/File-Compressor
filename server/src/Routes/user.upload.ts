import { Router } from "express";
import { isUserLoggedIn } from "../middleware/auth.middleware";
import { upload } from "../middleware/userfile.middleware";
import { userFile } from "../Controllers/userfile.controller";



export const userUploadFile=Router();
userUploadFile.post('/upload',isUserLoggedIn,upload.single('userfile'),userFile);