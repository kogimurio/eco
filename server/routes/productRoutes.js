const express = require('express');
const router = express.Router();
const { uploadProductImages } = require('../middleware/Uploads')
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
    getBestSellers,
    getFeaturedProducts,
    getClearanceProducts,
    getNewProducts,
    getFilterSidebarProducts,
    searchProducts
} = require('../controllers/productController');



router.post(
  '/',
  uploadProductImages, // Max 5 images per product
  createProduct
);

// router.get('/by-query', getProductByQuery);
router.get('/', getAllProducts); 
router.get('/search', searchProducts);
router.get('/best-sellers', getBestSellers);
router.get('/featured', getFeaturedProducts);
router.get('/clearance', getClearanceProducts);
router.get('/new', getNewProducts);
router.get('/filterby', getFilterSidebarProducts);
router.get('/:slug', getProduct);
router.put('/:id', 
  uploadProductImages,
  updateProduct);
router.delete('/:id', deleteProduct);
router.get('/related_products/:slug', getRelatedProducts);




module.exports = router;