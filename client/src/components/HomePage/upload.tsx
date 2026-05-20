import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/HomePages/uploadpage.css";
import { env } from "../../configs/env.config";
import axios from "axios";
import { ShowAlert } from "../../utils/alert";

interface compressedImage{
    outputPath:string,
    BeforeCompressionSize:string,
    AfterCompressionSize:string,
    TotalMbSaved:string,
}


export function UploadFile(){
    const [file,setFile]=useState<File>();
    const location=useLocation();
    const tool=location.state?.harsh;
    const store=[
        {
          title:tool.title,
          desc:tool.desc,
          userName:tool.userName,  
        },
    ]
        const [data,setData]=useState<compressedImage>();
        const [loading,setloading]=useState(false);
        const [hideData,setHideData]=useState(false);
        const handleSubmit=async(e:React.FormEvent<HTMLButtonElement>)=>{
            e.preventDefault();
            if(!file || !store[0].title){
                ShowAlert('please select a file to compress');
                return;
            }
            setloading(true);
            setHideData(false);
            const formData=new FormData();
            formData.append('userfile',file);
            formData.append('title',store[0].title);
            try{
                const response=await axios.post(`${env.backendUrl}/api/v1/userFile`,formData,{withCredentials:true});
                if(response.data.message=== 'Successfully Compressed'){
                    setHideData(true);
                    ShowAlert("file compressed successfully")
                    setData(response.data.data);
                }
            }catch(err){
                ShowAlert(err);
            }finally{
                setloading(false);
            }
    }


    const handleDownload = (filePath: string) => {
    const fileName = filePath.split("/").pop();
    window.location.href = `${env.backendUrl}/api/v1/download/${fileName}`;
};
    return(
        <>
         <div className="upload-container">
        <p className="upload-text">Upload your file here {store[0].userName}</p> 
        <h1 className="upload-title">{store[0].title}</h1>
        <form  className="upload-form" encType="multipart/form-data">
         <label className="upload-box">
            <input className="file-input" type="file" name="userfile" onChange={(e)=>setFile(e.target.files?.[0])} />
             <div className="upload-inner">
                    <div className="cloud">☁</div>
                    <p>Drop files here or click to upload</p>
                    <span className="choose-file">Choose file</span>
                    <p className="file-name">{file?file.name:" "}</p>
                </div>
            </label>
            <button onClick={handleSubmit} className="start-btn" type="submit">{loading ?(<div className="spinner"></div>):("Send")}</button>
        </form>

        {data && hideData && (
           <>
           <div>
           <h1>Size Before Compression:{data.BeforeCompressionSize}MB</h1>
           <h1>Size After Compression:{data.AfterCompressionSize}MB</h1>
           <h1>Total Mb Saved:{data.TotalMbSaved}MB</h1>
           <button onClick={()=>handleDownload(data.outputPath)}>Download</button>
           </div>
           </>
        )}
        </div>
        </>
    );
}