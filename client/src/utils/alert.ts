import Swal from "sweetalert2";
import { AxiosError } from "axios";

export const ShowAlert=(err:unknown)=>{
    let message="Something went wrong";
    if(typeof err=== "string" && (err=== "file compressed successfully" || err=== "Successfully Download")){
        let showMess="successfull";
        if(err=== 'file compressed successfully'){
            showMess="file compressed successfully";
        }else if(err=== 'Successfully Download'){
            showMess="Successfully Download";
        }
        return Swal.fire({
            toast:true,
            title:showMess,
            position:'top-end',
            icon:"success",
            showConfirmButton:false,
            timer: 2000,
            background: "#0f172a",
            color: "#e2e8f0",
        })
    }
    if(typeof err=== "string"){
        message=err;
    }else{
    const error=err as AxiosError;
    if(error.response && error.response.data){
        const data=error.response.data as {error:string;message:string};
        message=data.message || data.error || "Something Went Wrong";
        if(message=== "token not found"){
            return;
        }
    }
}
    Swal.fire({
        toast:true,
        position:"top-end",
        icon:"error",
        title:message,
        timer: 2000,
    showConfirmButton: false,
    background: "#0f172a",
    color: "#e2e8f0",
    })
}