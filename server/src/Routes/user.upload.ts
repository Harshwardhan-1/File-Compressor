import { Router } from "express";
import { isUserLoggedIn } from "../middleware/auth.middleware";
export const userUploadFile=Router();



userUploadFile.post('/upload',isUserLoggedIn,)