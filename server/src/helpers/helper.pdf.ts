import {Request,Response,NextFunction} from 'express';
import {exec} from 'child_process';
import fs from 'fs/promises';
import path from 'path';

interface compressedPdf{
    title:string,
    inputpath:string,
    outputpath:string,
    mimetype:string,    
    fileSize:number,
}
export const pdfhelper=async(data:compressedPdf)=>{
    try{

const allowedpdfmimetype=["application/pdf"];
if(!allowedpdfmimetype.includes(data.mimetype)){
    throw new Error("file type not supported");
}
const pdfBeforeCompression=data.fileSize/(1024*1024);
return new Promise((resolve,reject)=>{
    const command = `
            gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${data.outputpath}" "${data.inputpath}"`
            ;
            exec(command,async(err)=>{
                try{
                if(err){
                    reject(err);
                    return;
                }
            await new Promise((res) =>
            setTimeout(res, 1000)
        );
                const compressedFile=await fs.stat(data.outputpath);
                const pdfafterCompression=compressedFile.size/(1024*1024);
                const TotalMbSaved=(pdfBeforeCompression-pdfafterCompression);

                resolve({
                    outputPath:data.outputpath,
                    BeforeCompressionSize:pdfBeforeCompression.toFixed(2),
                    AfterCompressionSize:pdfafterCompression.toFixed(2),
                    TotalMbSaved:TotalMbSaved.toFixed(2),
                })
            }catch(error){
                reject(error);
            }
          })  
})
}catch(err){
    throw err;
}

}