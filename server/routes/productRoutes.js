const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
    // getProductByQuery
} = require('../controllers/productController');

router.post('/', createProduct);
// router.get('/by-query', getProductByQuery);
router.get('/', getAllProducts); 
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
// Get product by query string

module.exports = router;