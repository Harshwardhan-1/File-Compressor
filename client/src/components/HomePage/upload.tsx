import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axios from 'axios';
import { env } from "../../configs/env.config";
import '../styles/uploadpage.css'



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
    console.log(store); 

    interface DownloadCompressedImage{
        fileType:string,
        orignalSize:string,
        compressedSize:string,
        compressedUrl:string,
    }
    const [compressedImage,setCompressedImage]=useState<DownloadCompressedImage>();
    const [loading,setLoading]=useState<boolean>(false);

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        if(!file){
            setLoading(false);
            return alert('please select a file');
        }
           const formdata=new FormData();
            formdata.append('userfile',file);
            formdata.append('filetype',store[0].title);
        try{
            const response=await axios.post(`${env.backendUrl}/api/v1/upload`,formdata,{withCredentials:true});
            if(response.data.message=== 'successfully compressed'){
                alert('file compressed successfully');
               setCompressedImage(response.data.data);
            }
        }catch(err){
        const error=err as AxiosError;
        if(error.response && error.response.data){
            const data=error.response.data as {error?:string,message?:string};
            console.log(data.error || data.message || 'something went wrong');
        }else{
            alert(error.message);
        }
    }finally{
        setLoading(false);
    }
    }

    return(
        <>
         <div className="upload-container">
        <p className="upload-text">Upload your file here {store[0].userName}</p> 
        <h1 className="upload-title">{store[0].title}</h1>
      
        <form  className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data">
         <label className="upload-box">
            <input className="file-input" type="file" name="userfile" onChange={(e)=>setFile(e.target.files?.[0])} />
             <div className="upload-inner">
                    <div className="cloud">☁</div>
                    <p>Drop files here or click to upload</p>
                    <span className="choose-file">Choose file</span>
                    <p className="file-name">
                        {file?file.name:" "}
                    </p>
                </div>
            </label>
            <button className="start-btn" type="submit">
                {loading?<div className="spinner"></div>:"Start"}
            </button>
        </form>
        </div>
        

        {compressedImage && (
            <div className="result-container">
  <div className="result-card">
    <h2 className="result-title">Compression Result</h2>

    <div className="result-item">
      <span>Original Size:</span>
      <p>{compressedImage.orignalSize}</p>
    </div>

    <div className="result-item">
      <span>Compressed Size:</span>
      <p>{compressedImage.compressedSize}</p>
    </div>

    <a
      href={`${env.backendUrl}${compressedImage.compressedUrl}`}
      download
      className="download-link"
    >
      Download Compressed File
    </a>
  </div>
</div>
        )}
        </>
    );
}