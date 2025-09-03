const express = require('express');
const router = express.Router();
const { uploadCategoryImage } = require('../middleware/Uploads')
const {
    createCategory,
    getCategories,
    getCategory
} = require('../controllers/categoryController');

router.post('/',
    uploadCategoryImage,
    createCategory);
router.get('/', getCategories);
router.get('/:slug', getCategory);

module.exports = router;