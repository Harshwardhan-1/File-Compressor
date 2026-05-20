import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/HomePages/uploadpage.css";
import { env } from "../../configs/env.config";
import axios from "axios";
import { ShowAlert } from "../../utils/alert";

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

    const handleSubmit=async()=>{
        if(!file || !store[0].title){
            return;
        }
        const formData=new FormData();
        formData.append('userfile',file);
        formData.append('title',store[0].title);
        try{
            const response=await axios.post(`${env.backendUrl}/api/v1/userFile`,formData,{withCredentials:true});
            if(response.data.message=== 'successfull'){
                console.log('file compressed successfully');
            }
        }catch(err){
            ShowAlert(err);
        }
    }
    return(
        <>
         <div className="upload-container">
        <p className="upload-text">Upload your file here {store[0].userName}</p> 
        <h1 className="upload-title">{store[0].title}</h1>
        <form  className="upload-form" encType="multipart/form-data" onSubmit={handleSubmit}>
         <label className="upload-box">
            <input className="file-input" type="file" name="userfile" onChange={(e)=>setFile(e.target.files?.[0])} />
             <div className="upload-inner">
                    <div className="cloud">☁</div>
                    <p>Drop files here or click to upload</p>
                    <span className="choose-file">Choose file</span>
                    <p className="file-name">{file?file.name:" "}</p>
                </div>
            </label>
            <button className="start-btn" type="submit">Send</button>
        </form>
        </div>
        </>
    );
}