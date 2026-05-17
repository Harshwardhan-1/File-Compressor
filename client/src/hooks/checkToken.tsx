import { useState,useEffect, useRef } from "react";
import { ShowAlert } from "../utils/alert";
import axios from "axios";
import { env } from "../configs/env.config";
export function CheckToken(){
   interface userlogin{
        name:string,
        userName:string,
        email:string,
    }
    const [data,setData]=useState<userlogin | null>(null);
    const checked=useRef(false);
    useEffect(()=>{
        if(checked.current){
            return;
        }
        checked.current=true;
        const fetch=async()=>{
            try{
                const response=await axios.get(`${env.backendUrl}/api/v1/checkTok`,{withCredentials:true});
                if(response.data.message=== 'successfull'){
                    setData(response.data.data);
                }
            }catch(err){
                ShowAlert(err);
            }
        };
        fetch();
    },[checked]);
    return {data};
}