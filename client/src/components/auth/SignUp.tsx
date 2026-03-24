import '../styles/Dashboard.css';
import axios from 'axios';
import '../styles/SignUp.css';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { env } from '../../configs/env.config';

export function SignUp() {
    const [name,setName]=useState<string>('');
    const [userName,setuserName]=useState<string>('');
    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [confirmPassword,setConfirmPassword]=useState<string>('');

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(password!==confirmPassword){
        return alert('password and confirm password do not match');
    }
    const send={name,userName,email,password};
    try{
        const response=await axios.post(`${env.backendUrl}/api/v1/addUser`,send,{withCredentials:true});
        if(response.data.message=== 'user created successfully'){
            alert('user created successfully');
        }
    }catch(err){
        const error=err as AxiosError;
        if(error.response && error.response.data){
            const data=error.response.data as {error?:string,message?:string};
            alert(data.error || data.message || 'something went wrong');
        }else{
            alert(error.message);
        }
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
          <button type='submit'>Submit</button>
        </form>
        </div>
        </div>
    </>
  );
}