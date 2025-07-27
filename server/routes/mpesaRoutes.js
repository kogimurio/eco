const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')

const {
    initiateStkPush,
    mpesaCallback,
    getPaymentStatus
} = require('../controllers/mpesaController')

router.post('/',
    initiateStkPush
)

router.post('/callback',
    mpesaCallback
)


router.get('/payment-status/:checkoutRequestID',
    getPaymentStatus
)



module.exports = router;