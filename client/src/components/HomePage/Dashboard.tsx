import { useNavigate } from "react-router-dom";
import { Lock, FileImage, FileText, FileArchive, Video } from "lucide-react";
export function Dashboard(){
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
      title: "Create ZIP file",
      icon: <FileArchive size={28} />,
      desc: "Combine selected files into a ZIP...",
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
    <button className="login">Login</button>
    <button  onClick={()=>navigate('/register')} className="register">Register</button>
  </div>

      <div className="header">
        <h1>Free Online File Compressor</h1>
        <p>Compress your files online. Select a compression tool:</p>
      </div>

            <div className="categories">
        <span>Compress video</span>
        <span>Compress Image</span>
        <span>Compress PDF</span>
        <span>Create ZIP</span>
      </div>
      <div className="card-grid">
        {tools.slice(0,4).map((tool, index) => (
          <div className="card" key={index}>
            <div className="card-left">
                 <div className="icon">{tool.icon}</div>
              <div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              
              </div>
            </div>
            <Lock size={18} className="lock" />
          </div>
        ))}
      </div>
      <div className="bottom-card">
        <div className="card">
          <div className="card-left">
            <div className="icon">{tools[4].icon}</div>
            <div>
              <h3>{tools[4].title}</h3>
              <p>{tools[4].desc}</p>
            </div>
          </div>
          <Lock size={18} className="lock" />
        </div>
      </div>
    </div>
        </>
    );
}