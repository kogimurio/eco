const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    createOrder,
    getOrder
} = require('../controllers/orderController');

router.post('/',
    authMiddleware,
    createOrder
)

router.get('/',
    authMiddleware,
    getOrder
)

module.exports = router;