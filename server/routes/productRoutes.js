const express = require('express');
const router = express.Router();
const { uploadProductImages } = require('../middleware/Uploads')
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts
} = require('../controllers/productController');



router.post(
  '/',
  uploadProductImages, // Max 5 images per product
  createProduct
);

// router.get('/by-query', getProductByQuery);
router.get('/', getAllProducts); 
router.get('/:slug', getProduct);
router.put('/:id', 
  uploadProductImages,
  updateProduct);
router.delete('/:id', deleteProduct);
router.get('/related_products/:slug', getRelatedProducts);
// Get product by query string

module.exports = router;