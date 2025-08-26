const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    createReview,
    getProductReviews
} = require('../controllers/ReviewController');

router.post(
    '/:slug',
    authMiddleware,
    createReview
);

router.get(
    '/:slug',
    getProductReviews
)

module.exports = router;