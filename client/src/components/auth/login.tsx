import { useState } from "react";
import axios from "axios";
import { env } from "../../configs/env.config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/authPageStyle/login.css";
import { ShowAlert } from "../../utils/alert";
export function Login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [loading,setLoading]=useState<boolean>(false);

   

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        const send={email,password};
        try{
            const response=await axios.post(`${env.backendUrl}/api/v1/oldUser`,send,{withCredentials:true});
            if(response.data.message=== 'already registered'){
                navigate('/');
            }
        }catch(err){
            ShowAlert(err);
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
         <div className='signin-page-wrapper'>
        <div className="signin-page">
        <h1>Welcome Back</h1>
        <p>Enter your Credentials to access your account</p>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="text" placeholder="Enter your email here" value={email} onChange={(e)=>setEmail(e.target.value)}  />
            <label>Password</label>
            <input type="password" placeholder="Enter your password here" value={password} onChange={(e)=>setPassword(e.target.value)} />
           
           
            <button type="submit" disabled={loading}>
                {loading ?<div className="spinner"></div>:"Login"}
                </button>




            <div className="signup-link">
          Don't have an account?{" "}
          <Link to="/register">SignUp</Link>
        </div>
        </form>
        </div>
        </div>
        </>
    );
}