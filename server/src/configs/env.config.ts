import dotenv from 'dotenv';
dotenv.config({
    path:`.env.${process.env.NODE_ENV ||  "development"}.local`
})


export const{
    MONGO_URI,
    PORT,
    FRONTEND_URL,
    GROQ_API_KEY,  
    JWT_SECRET,
}=process.env;