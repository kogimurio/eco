const express = require('express');
const router = express.Router();
const upload = require('../middleware/Uploads')
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
    // getProductByQuery
} = require('../controllers/productController');



router.post(
  '/',
  upload.array('image', 5), // Max 5 images per product
  createProduct
);

// router.get('/by-query', getProductByQuery);
router.get('/', getAllProducts); 
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// Get product by query string

module.exports = router;