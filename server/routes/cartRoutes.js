const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const {
    addToCart,
    getCart
} = require('../controllers/cartController');

router.post(
    '/',
    authMiddleware,
    addToCart
);
router.get(
    '/',
    authMiddleware,
    getCart
);

module.exports = router;