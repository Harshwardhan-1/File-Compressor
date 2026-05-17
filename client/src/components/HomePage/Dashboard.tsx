import { useNavigate } from "react-router-dom";
import { Lock, FileImage, FileText,  Video } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { env } from "../../configs/env.config";
import { AxiosError } from "axios";
import "../styles/HomePages/Dashboard.css";
export function Dashboard(){
    interface userlogin{
        name:string,
        userName:string,
        email:string,
    }
    interface cardClick{
      title:string,
      desc:string,
    }
    const [data,setData]=useState<userlogin | null>(null);

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get(`${env.backendUrl}/api/v1/checkTok`,{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                const error=err as AxiosError;
                if(error.response && error.response.data){
                    const data=error.response.data as {error?:string,message?:string};
                    console.log(data.error || data.message || 'something went wrong');
                }
            }
        };
        fetch();
    },[]);

    
    const handleCardClick=async(tool:cardClick)=>{
      if(!data){
      return  alert('please do a signUp first');
      }else{
        navigate('/upload',{state:{harsh:{title:tool.title,desc:tool.desc,userName:data?.userName}}})
      }
    }
    const navigate=useNavigate();
      const tools = [
    {
      title: "Compress video",
      icon: <Video size={28} />,
      desc: "Reduce video size by adjusting...",
    },
    {
      title: "Compress image",
      icon: <FileImage size={28} />,
      desc: "Reduce the size of JPG, PNG, GIF, or RAW...",
    },
    {
      title: "Compress PDF",
      icon: <FileText size={28} />,
      desc: "Reduce PDF size for easier upload and...",
    },
    {
      title: "Compress JPG",
      icon: <FileImage size={28} />,
      desc: "Reduce JPG size or compress images to JPG...",
    },
  ];

    return(
        <>
    <div className="dashboard">
          <div className="auth-buttons">
           {data?(
            <h3 className="welcome-text">
                Welcome,{data.userName}
            </h3>
           ):(
            <>
                <button onClick={()=>navigate('/login')} className="login">Login</button>
                <button  onClick={()=>navigate('/register')} className="register">Register</button>
            </>
           )}
  </div>
      <div className="header">
        <h1>Free Online File Compressor</h1>
        <p>Compress your files online. Select a compression tool:</p>
      </div>
            <div className="categories">
        <span>Compress video</span>
        <span>Compress Image</span>
        <span>Compress PDF</span>
        <span>Compress JPG</span>
      </div>
      <div className="card-grid">
        {tools.slice(0,3).map((tool, index) => (
          <div className="card" key={index} onClick={()=>handleCardClick(tool)}>
            <div className="card-left">
                 <div className="icon">{tool.icon}</div>
              <div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-card">
        <div className="card" onClick={()=>handleCardClick(tools[4])}>
          <div className="card-left">
            <div className="icon">{tools[3].icon}</div>
            <div>
              <h3>{tools[3].title}</h3>
              <p>{tools[3].desc}</p>
            </div>
          </div>
          <Lock size={18} className="lock" />
        </div>
      </div>
    </div>
        </>
    );
}