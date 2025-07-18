const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const path = require('path');

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: (req, file) => {
//         // console.log('Setting Cloudinary folder for uploads');
//         return {
//             public_id: `ecoapp/products/${Date.now()}-${file.originalname.split('.')[0]}`, // Cloudinary folder
//             allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//             transformation: [{ width: 800, height: 800, crop: 'limit' }]
//         }
//     }
// });

// Config storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store in /uploads folder
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});


// Validate image type 
// const fileFilter = (req, file, cb) => {
//     console.log('Filtering file:', file.originalname);
//     const allowedTypes = /jpeg|jpg|png|webp/;
//     const isValid = allowedTypes.test(file.mimetype);
//     if (!isValid) {
//         console.log('❌ Rejected file:', file.originalname);
//         return cb(new Error('Invalid file type'), false);
//     }
//     console.log('✅ Accepted file:', file.originalname);
//     cb(null, true);
// };

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
    if (!allowedExts.includes(ext)) {
        return cb(new Error('Only jpg, png and webp images are allowed'), false);
    }
    cb(null, true)
};

// Multer upload
const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

exports.uploadProductImages = upload.fields([
    { name: 'thumbnail', maxcount: 1 },
    { name: 'images', maxCount: 5 }
]);