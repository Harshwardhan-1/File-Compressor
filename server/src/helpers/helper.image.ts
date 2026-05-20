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

export const imageHelper=async(data:imageData)=>{
    try{
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
           //fs stat give info about file size when created,updated simply means it give info about file
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