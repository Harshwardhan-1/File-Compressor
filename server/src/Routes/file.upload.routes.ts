import {Router} from 'express';
export const fileUpload=Router();
import { upload } from '../middleware/file.upload.middleware';
import { userFile } from '../Controllers/file.controller';
import { isUserLoggedIn } from '../middleware/auth.middleware';
import { downloadFile } from '../Controllers/file.controller';


fileUpload.post('/userFile',isUserLoggedIn,upload.single('userfile'),userFile);
fileUpload.get(`/download/:fileName`,isUserLoggedIn,downloadFile);