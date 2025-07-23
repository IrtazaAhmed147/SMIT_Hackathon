import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const uploadOnCloudinary = async (file) => {
  try {
    console.log(file, "==>>> file");

    const result = await cloudinary.uploader.upload(file.path);

    // Delete the file from local storage
    setTimeout(() => fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    }), 5000);

    return result.secure_url; // ✅ This is what you save in DB
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    return null;
  }
}
// export const uploadOnCloudinary =async (file) => {
//   console.log(file, "==>>> file")
//  const result = await cloudinary.uploader
//   .upload(file.path)
//   .then(result=>{
//     console.log(result)
//     setTimeout(()=> fs.unlink(file.path, (err) => console.log(err)), 5000)
//     return result.secure_url;
//   })
//   .catch((err)=>{
//      console.log(err)
//      return null
//     })
// }