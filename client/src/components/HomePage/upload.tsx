import { useLocation } from "react-router-dom";
export function UploadFile(){
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
    return(
        <>
        <p>Upload your file here {store[0].userName}</p> 
        </>
    );
}