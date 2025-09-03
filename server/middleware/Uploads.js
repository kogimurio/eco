const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');


const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
    if (!allowedExts.includes(ext)) {
        return cb(new Error('Only jpg, png and webp images are allowed'), false);
    }
    cb(null, true)
};

// Factory: pass destination folder and field definitions
const makeUploader = (dest, fields) => {
    const storage = multer.diskStorage({
        destination: function (req, res, cb) {
            const dir = path.join(__dirname, `../uploads/${dest}`);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            const relativePath = path.join(`uploads/${dest}`, uniqueName).replace(/\\/g, '/');
            file.relativePath = relativePath;
            cb(null, uniqueName);
        }
    });

    // Multer upload
    const upload = multer({ 
        storage,
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // 2MB
    });

    return upload.fields(fields);
}



exports.uploadProductImages = makeUploader('product', [
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);

exports.uploadCategoryImage = makeUploader('categories', [
    { name: 'image', maxCount: 1 }
]);