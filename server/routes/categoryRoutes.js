const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategory
} = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:slug', getCategory);

module.exports = router;