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
// router.post('/mpesa/callback', async (req, res) => {
//   const callbackData = req.body;
  
//   // Update payment status in DB based on callback info
//   // e.g. Payment.findOneAndUpdate({ checkoutRequestID }, { status: "completed" })
  
//   console.log("M-PESA CALLBACK:", callbackData);

//   res.status(200).json({ message: "Callback received" });
// });


module.exports = router;