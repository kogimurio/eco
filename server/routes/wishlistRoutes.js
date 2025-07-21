const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
} = require('../controllers/wishlistController');

router.post('/', authMiddleware, addToWishlist);
router.delete('/:productId', authMiddleware, removeFromWishlist);
router.get('/', authMiddleware, getUserWishlist);

module.exports = router;