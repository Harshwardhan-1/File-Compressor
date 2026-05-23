import dotenv from 'dotenv';
dotenv.config({
    path:`.env.${process.env.NODE_ENV ||  "development"}.local`
})


export const{
    MONGO_URI,
    PORT,
    FRONTEND_URL,
    GROQ_API_KEY,  
    SALT_ROUND,
    JWT_SECRET,
    SENDGRID_EMAIL,
    SENDGRID_API_KEY,
    COMPRESS_PDF,
    COMPRESS_VIDEO,
}=process.env;