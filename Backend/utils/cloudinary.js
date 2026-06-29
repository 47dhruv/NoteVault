import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "my_cloud_name",
  api_key: "my_key",
  api_secret: "my_secret",
});

const uploadImageOnCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, { //upload image 
      resource_type: "auto",
    });

    if (fs.existsSync(imagePath)) { // check and delete image
      fs.unlinkSync(imagePath);
    }

    const profilePicUrl = cloudinary.url(result.public_id, { //upload for crop
      transformation: [
        { width: 250, height: 250, crop: "thumb", gravity: "face" },
        { radius: "max" },
      ],
    });

    console.log(profilePicUrl);

    return {
      profilePicUrl, //return profile picurl or result
      result,
    };
  } catch (error) {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    console.error(error);
    return null;
  }
};

export { uploadImageOnCloudinary };