const axios = require('axios');
const moment = require('moment');
const Payment = require('../models/Payment')
const { getAccessToken } = require('../utils/mpesa')

exports.initiateStkPush = async(req, res) => {
    const { phone, amount, accountReference = "EcoShop", transactionDesc = "Checkout Payment" } = req.body

    try {
        const shortCode = process.env.MPESA_SHORTCODE;
        const passkey = process.env.MPESA_PASSKEY;
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

        const token = await getAccessToken();

        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: shortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: 1,
                PartyA: phone,
                PartyB: shortCode,
                PhoneNumber: phone,
                CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
                AccountReference: accountReference,
                TransactionDesc: transactionDesc
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Save initial payment status to DB (optional)
        // await Payment.create({ phone, amount, status: "pending" });
        res.status(200).json({
            message: 'STK Push sent',
            checkoutRequestID: response.data.CheckoutRequestID
        });
    } catch (error) {
        console.error("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "M-PESA STK Push Failed",
            error
        })
    };

}


exports.mpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;

    const stkCallback = callbackData?.Body?.stkCallback;

    const merchantRequestID = stkCallback?.MerchantRequestID;
    const checkoutRequestID = stkCallback?.CheckoutRequestID;
    const resultCode = stkCallback?.ResultCode;
    const resultDesc = stkCallback?.ResultDesc;

    if (resultCode === 0) {
      const amount = stkCallback.CallbackMetadata?.Item?.find(item => item.Name === 'Amount')?.Value;
      const phone = stkCallback.CallbackMetadata?.Item?.find(item => item.Name === 'PhoneNumber')?.Value;

      // Save successful transaction to DB
      // await Payment.create({ phone, amount, status: "success", merchantRequestID, checkoutRequestID });
      await Payment.create({
            phone,
            amount,
            merchantRequestID,
            checkoutRequestID,
            resultCode,
            resultDesc,
            status: resultCode === 0 ? 'success' : 'failed'
        });

      console.log("✅ M-PESA Payment Successful", { phone, amount });

    } else {
      console.log("❌ M-PESA Payment Failed", { resultDesc });

      // Optionally save failed transaction
      // await Payment.create({ status: "failed", merchantRequestID, checkoutRequestID, reason: resultDesc });
      await Payment.create({
        merchantRequestID,
        checkoutRequestID,
        resultCode,
        resultDesc,
        status: 'failed'
    });
    }

    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Callback processing error:", error);
    res.status(500).json({ error: "Callback processing failed" });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { checkoutRequestID } = req.params;
  try {
    const payment = await Payment.findOne({ checkoutRequestID });
    if (!payment) return res.status(404).json({ status: "pending" });

    res.status(200).json({ status: payment.status });
  } catch (error) {
    res.status(500).json({ error: "Failed to check payment status" });
  }
};



