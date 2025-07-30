const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    initiateStkPush,
    mpesaCallback,
    getPaymentStatus,
    getAllPayments
} = require('../controllers/paymentController')

router.post('/',
    authMiddleware,
    initiateStkPush
);

router.post('/callback',
    mpesaCallback
)


router.get('/payment-status/:checkoutRequestID',
    getPaymentStatus
)

router.get('/all_payments',
    getAllPayments
)



module.exports = router;