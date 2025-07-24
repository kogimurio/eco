const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const {
    addToCart,
    getCartProduct,
    deleteCartProduct
} = require('../controllers/cartController');

router.post(
    '/',
    authMiddleware,
    addToCart
);
router.get(
    '/',
    authMiddleware,
    getCartProduct
);

router.delete(
    '/:productId',
    authMiddleware,
    deleteCartProduct
);

module.exports = router;