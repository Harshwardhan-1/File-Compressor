import multer from "multer";
import crypto from 'crypto';
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //it get the extension from the file like jpg,png etc
    const ext=path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix+ext);
  }
})

export const upload = multer({ storage: storage })