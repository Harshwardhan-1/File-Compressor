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

    // interface compLinkSize{
    //     compressed:string,
    //     orignalSize:string,
    //     compressedSize:string,
    // }
    // const [complink,setcomplink]=useState<compLinkSize>();
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
            if(response.data.message=== 'successfull'){
                alert('file compressed successfully');
                // setcomplink(response.data.data);
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
//     const handleDownload = (url: string, fileName: string) => {
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = fileName; // it teels browser to save as
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
    
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

       {/* {complink && (
    <div>
        <p>OrignalSize:{complink?.orignalSize}</p>
        <p>compressedSize:{complink?.compressedSize}</p>
 <button
      className="download-btn"
      onClick={() => handleDownload(
        `http://localhost:3000/download/${complink.compressed.split('/').pop()}`,
        complink.compressed.split('/').pop() || "file.jpeg"
      )}
    >
      Download Compressed Image
    </button>
    
    </div>
)} */}

        </>
    );
}