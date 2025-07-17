const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const path = require('path');


// 🔹 Test 1: Upload from a remote URL (quick ping test)
router.get('/cloudinary-test', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      {
        folder: 'ecoapp/test',
        public_id: 'connection-test'
      }
    );

    res.status(200).json({
      message: 'Cloudinary is connected ✅',
      url: result.secure_url
    });
  } catch (err) {
    console.error('❌ Cloudinary connection failed:', err);
    res.status(500).json({ message: 'Cloudinary connection failed', error: err.message });
  }
});


// 🔹 Test 2: Upload from local file (test-images/jacket-front.jpg)
router.get('/cloudinary-local-upload', async (req, res) => {
  try {
    const localImagePath = path.join(__dirname, '../test-images/jacket-front.webp');

    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: 'ecoapp/products',
      transformation: [{ width: 800, height: 800, crop: 'limit' }]
    });

    res.status(200).json({
      message: 'Uploaded local image successfully ✅',
      url: result.secure_url
    });
  } catch (err) {
    console.error('❌ Local image upload failed:', err);
    res.status(500).json({ message: 'Local image upload failed', error: err.message });
  }
});

module.exports = router;
