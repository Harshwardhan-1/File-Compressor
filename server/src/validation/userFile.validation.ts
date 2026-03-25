import z from 'zod';
export const userFileSchema=z.object({
  filetype:z.enum([
   "Compress video", 
   "Compress image",
  "Compress PDF",
  "Create ZIP file",
  "Compress JPG",
]),
});