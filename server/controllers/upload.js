const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dvyoyiuds", 
    api_key: "626349287925964",      
    api_secret: "qxnvNwxEJBwomvVKoLpJtm6FGGQ", 
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let resourceType = "auto"; // Default type for images
        if (file.mimetype === "application/pdf") {
            resourceType = "raw"; // Use raw for non-image files like PDFs
        }
        return {
            folder: "products", // Specify the folder in Cloudinary
            resource_type: resourceType,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 5 MB
});

module.exports = upload;
