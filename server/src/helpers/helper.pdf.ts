import {Request,Response,NextFunction} from 'express';

interface compressedPdf{
    title:string,
    inputpath:string,
    outputpath:string,
    mimetype:string,
    fileSize:number,
}
export const pdfhelper=async(data:compressedPdf)=>{

}