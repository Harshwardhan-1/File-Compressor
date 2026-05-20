import Router from 'express';
export const fileUpload=Router();
import { upload } from '../middleware/file.upload.middleware';
import { userFile } from '../Controllers/file.controller';
import { isUserLoggedIn } from '../middleware/auth.middleware';


fileUpload.post('/userFile',isUserLoggedIn,upload.single('userfile'),userFile);