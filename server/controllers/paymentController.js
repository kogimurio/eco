const axios = require('axios');
const moment = require('moment');
const Payment = require('../models/Payment')
const { getAccessToken } = require('../utils/mpesa')

exports.initiateStkPush = async(req, res) => {
    const { phone, amount, accountReference = "Fashionova", transactionDesc = "Checkout Payment" } = req.body

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

        // ✅ Extract IDs from the response
        const merchantRequestID = response.data.MerchantRequestID;
        const checkoutRequestID = response.data.CheckoutRequestID;
        // Save initial payment status to DB (optional)
        // await Payment.create({ phone, amount, status: "pending" });
        await Payment.create({
            phone,
            amount,
            merchantRequestID,
            checkoutRequestID,
            resultCode: null,
            resultDesc: null,
            status: 'pending',
        });
        res.status(200).json({
            message: 'STK Push sent',
            data: {
          CheckoutRequestID: checkoutRequestID,
          MerchantRequestID: merchantRequestID,
      },
        });
    } catch (error) {
        console.error("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "M-PESA STK Push Failed",
            error
        });
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

    let updateData = {
      resultCode,
      resultDesc,
      status: resultCode === 0 ? 'success' : 'failed'
    };

    console.log("🟡 Raw Callback Body:", JSON.stringify(callbackData, null, 2));
    
    // If payment is successful, extract phone and amount from callback
    if (resultCode === 0) {
      const metadata = stkCallback.CallbackMetadata?.Item || [];

      const amount = stkCallback.CallbackMetadata?.Item?.find(item => item.Name === 'Amount')?.Value;
      const phone = stkCallback.CallbackMetadata?.Item?.find(item => item.Name === 'PhoneNumber')?.Value;
      const receipt = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;

      updateData.amount = amount;
      updateData.phone = phone;
      updateData.receipt = receipt;

      console.log("✅ M-PESA Payment Successful", { phone, amount });
    } else {
      console.log("❌ M-PESA Payment Failed", { resultDesc });
    }

    // ✅ Update the matching document instead of creating a new one
    await Payment.findOneAndUpdate(
      { checkoutRequestID },
      updateData,
      { new: true }
    );

    res.status(200).json({ message: "Callback received and processed successfully" });
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
        console.error("Error checking payment status:", error.message);
        return res.status(500).json({ error: "Internal server error" });
  }
};


// Get all payments
exports.getAllPayments =async (req, res) => {
    try {

            const payments = await Payment.find()
            .populate('user', 'firstName lastName email')
            .sort({ createdAt: -1 });

            if (!payments) {
                return res.status(200).json({
                    success: true,
                    payments: null
                });
            }

            res.status(200).json({
                success: true,
                payments
            })

    } catch (error) {
        console.log('Error fetching payments:', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
