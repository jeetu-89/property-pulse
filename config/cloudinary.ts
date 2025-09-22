import { v2 as cloudinary } from "cloudinary";

const name = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if(!name || !apiKey || !apiSecret){
    throw new Error("Pass cloudinary credentials to .env file.")
}
cloudinary.config({
    cloud_name: name,
    api_key: apiKey,
    api_secret: apiSecret,

})

export default cloudinary;