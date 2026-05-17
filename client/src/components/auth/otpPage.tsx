import { useState } from "react";
import axios, { AxiosError } from "axios";
import { env } from "../../configs/env.config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/authPageStyle/otpPage.css";
import { ShowAlert } from "../../utils/alert";
export function OtpPage(){
    const navigate=useNavigate();
    const [otpnumber,setotpnumber]=useState<string>('');
    const [loading,setLoading]=useState<boolean>(false);
    const [isBlurred,setIsBlurred]=useState<boolean>(false);
    const [resendLoad,setresendLoad]=useState<boolean>(false);



    const handleResend=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setresendLoad(true);
        try{
            const response=await axios.get(`${env.backendUrl}/api/v1/resendOtp`,{withCredentials:true});
            if(response.data.message=== 'successfully send'){
                alert('successfully send');
            }
        }catch(err){
            ShowAlert(err);
        }finally{
            setresendLoad(false);
        }
    }

    

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsBlurred(true);
        const send={otpValue:otpnumber};
        setLoading(true);
        try{
            const response=await axios.post(`${env.backendUrl}/api/v1/verifyOtp`,send,{withCredentials:true});
            if(response.data.message=== 'successfull verified'){
              await Swal.fire({
                icon:"success",
                title:"Otp Verification",
                text:"Otp Verified Successfully",
                 showConfirmButton: true,
                 background: "#0b1b2b",
                 color: "#e2e8f0",
               })
                setIsBlurred(false);
                navigate('/');
            }
        }catch(err){
            const error=err as AxiosError;
            if(error.response && error.response.data){
                const data=error.response.data as {error?:string;message?:string};
                alert(data.error || data.message || 'something went wrong');
            }else{
                alert(error.message);
            }
        }finally{
            setLoading(false);
            setIsBlurred(false);
        }
    }
    return(
        <>
         <div className={`otp-page-wrapper ${isBlurred?"blurred":""}`}>
      <div className="otp-page">
        <h1>Verify OTP</h1>
        <p>Enter the 6-digit OTP sent to your email</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your 6 digit otp here" value={otpnumber} onChange={(e)=>setotpnumber(e.target.value)} />
            <button type="submit">
                {loading? <div className="spinner"></div> :"Submit"}
            </button>
            <button onClick={handleResend} disabled={resendLoad}>
                {resendLoad?<div className="spinner"></div>:"resend"}</button>
        </form>
        </div>
        </div>
        </>
    );
}