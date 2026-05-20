import sharp from 'sharp';
import path from 'path';
//it returns file complete data information about file
import fs from 'fs/promises';

interface imageData{
    title:string,
    inputpath:string,
    outputpath:string,
    mimetype:string,
    fileSize:number,
}

const allowedImageMimeTypes=["image/jpeg","image/png","image/webp","image/avif","image/tiff"];

export const imageHelper=async(data:imageData)=>{
    try{
        if(!allowedImageMimeTypes.includes(data.mimetype)){
            throw new Error("only images file are allowed");
            return;
        }
        const beforeCompression=data.fileSize/(1024*1024);
       if(data.mimetype=== "image/jpeg"){
                await sharp(data.inputpath)
                .resize({width:1080})
                .jpeg({quality:80})
                .toFile(data.outputpath);
               }else if(data.mimetype=== 'image/png'){
                await sharp(data.inputpath)
                .resize({width:1080})
                .webp({quality:80})
                .toFile(data.outputpath)
           }else if(data.mimetype=== 'image/webp' || data.mimetype=== 'image/tiff' || data.mimetype=== 'image/avif'){
            await sharp(data.inputpath)
            .resize({width:1080})
            .webp({quality:80})
            .toFile(data.outputpath)
           }else{
            throw new Error("unsupported file format");
           }
           const compressedFile=await fs.stat(data.outputpath);
           const afterCompression=compressedFile.size/(1024*1024);
           return{
            outputPath:data.outputpath,
            BeforeCompressionSize:beforeCompression.toFixed(2),
            AfterCompressionSize:afterCompression.toFixed(2),
            TotalMbSaved:(beforeCompression-afterCompression).toFixed(2),
           }
        }catch(err){
            throw err;
        }
}