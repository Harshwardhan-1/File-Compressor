import {exec} from 'child_process';
import fs from 'fs/promises';
interface helperVid{
    outputpath:string,
    title:string,
    inputpath:string,
    mimetype:string,
    fileSize:number,
}
export const helperVideo=async(data:helperVid)=>{
    try{
    const videoBeforeCompression=data.fileSize/(1024*1024);
    const allowedMimeTypes=["video/mp4","video/webm","video/avi","video/x-matroska","video/quicktime"];
    if(!allowedMimeTypes.includes(data.mimetype)){
        throw new Error("Invalid video type");
    }
   
const command = `C:\\ffmpeg-8.1.1-essentials_build\\bin\\ffmpeg.exe -i "${data.inputpath}" -vcodec libx264 -crf 28 -preset fast -movflags +faststart "${data.outputpath}"`;
    await new Promise((resolve,reject)=>{
    exec(command,(error,stdout,stderr)=>{
        if(error){
            console.log(error);
            reject(error);
        }else{
            resolve(true);
        }
    });
});

const compressedFile=await fs.stat(data.outputpath);
const videoafterCompression=compressedFile.size/(1024*1024);
const TotalMbSaved=(videoBeforeCompression-videoafterCompression).toFixed(2);
return{
outputPath:data.outputpath,
BeforeCompressionSize:videoBeforeCompression.toFixed(2),
AfterCompressionSize:videoafterCompression.toFixed(2),
TotalMbSaved:TotalMbSaved,
}
}catch(err){
    throw err;
}
}