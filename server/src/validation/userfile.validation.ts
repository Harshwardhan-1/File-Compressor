import {z} from 'zod';
export const userfilevalidation=z.object({
    title:z.enum([
        "Compress Video",
        "Compress image",
        "Compress PDF",
        "Compress JPG",
    ])
});