import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import axios from 'axios';
import { env } from "../../configs/env.config";
import '../styles/uploadpage.css';
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


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!file){
            return alert('please select a file');
        }
           const formdata=new FormData();
            formdata.append('userfile',file);
            formdata.append('filetype',store[0].title);
        try{
            const response=await axios.post(`${env.backendUrl}/api/userUpload/upload`,formdata,{withCredentials:true});
            if(response.data.message=== 'successfull'){
                alert('file compressed successfully');
            }
        }catch(err){
        const error=err as AxiosError;
        if(error.response && error.response.data){
            const data=error.response.data as {error?:string,message?:string};
            console.log(data.error || data.message || 'something went wrong');
        }else{
            alert(error.message);
        }
    }
    }
    
    return(
        <>
        <p>Upload your file here {store[0].userName}</p> 
        <h1>Upload {store[0].title}</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="file" onChange={(e)=>setFile(e.target.files?.[0])} />
            <button type="submit">Start</button>
        </form>
        </>
    );
}