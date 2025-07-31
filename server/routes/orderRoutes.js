const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    createOrder,
    getOrder,
    getAllOrder,
    getOrderItems,
    statusChange
} = require('../controllers/orderController');

router.post('/',
    authMiddleware,
    createOrder
)

router.get('/',
    authMiddleware,
    getOrder
)

router.get('/all_orders',
    getAllOrder
)

router.get('/order_items/:id',
    getOrderItems
)

router.put('/:id/status',
    statusChange
)

module.exports = router;