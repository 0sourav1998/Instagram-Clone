const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async(file,folder,height,quality)=>{
    const options = {
        folder : folder ,
        resource_typ : "auto" 
    }
    if(quality){
        options.quality = quality
    }
    if(height){
        options.height = height
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,options);
        return result;
    } catch (error) {
        console.log(error.message)
    }
}