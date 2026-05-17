import axios from 'axios';
import "../styles/authPageStyle/SignUp.css";
import { useState } from 'react';
import { env } from '../../configs/env.config';
import { useNavigate } from 'react-router-dom';
import {easeIn, motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShowAlert } from '../../utils/alert';

export function SignUp() {
    const navigate=useNavigate();   
    const [name,setName]=useState<string>('');
    const [userName,setuserName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');
    const [loading,setloading]=useState<boolean>(false);

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(password!==confirmPassword){
        return alert('password and confirm password do not match');
    }
    setloading(true);
    const send={name,userName,email,password};
    try{
        const response=await axios.post(`${env.backendUrl}/api/v1/addUser`,send,{withCredentials:true});
        if(response.data.message=== 'user created successfully'){
            navigate('/login');
        }
    }catch(err){
        ShowAlert(err);
    }finally{
        setloading(false);
    }
  }

  return (
    <>
    <div className="signup-page-wrapper">
          <div className="signup-page">
        <h1>Create an Account</h1>
        <p>Get Started with us</p>
        <form onSubmit={handleSubmit}>
               <label>Name</label>
          <input type="text" placeholder='Enter your Name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <label>Username</label>
          <input type="text" placeholder='Enter your username' value={userName} onChange={(e)=>setuserName(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder='Enter your email ' value={email} onChange={(e)=>setEmail(e.target.value)}  />
         <label>password</label>
          <input type="password" placeholder='Create a password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type="password"  placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <motion.button
          initial={{y:30,opacity:0}}
          whileInView={{y:0,opacity:1}}
          viewport={{amount:0.4,once:true}}
          transition={{duration:1.2,ease:easeIn}}
          type='submit'
           disabled={loading}>{loading ? <div className="spinner"></div>:"SignUp" }
           </motion.button>
           <div className="signin-link">
    Already have an account?{" "}
    <Link to="/login">Login</Link>
  </div>
        </form>
        </div>
        </div>
    </>
  );
}