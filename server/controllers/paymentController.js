const axios = require('axios');
const moment = require('moment');
const Payment = require('../models/Payment')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const { getAccessToken } = require('../utils/mpesa')
const { createOrderForUser } = require('./orderController');


exports.initiateStkPush = async (req, res) => {
    const { phone, amount, accountReference = "Fashionova", transactionDesc = "Checkout Payment" } = req.body;
    try {
        
        const userId = req.user.userId;
        console.log("req.user:", req.user);
        console.log("req.user.userId:", req.user.userId);
        // Check cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        const order = await Order.findOne({ user: userId })
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const formattedPhone = 
        phone.startsWith("0") ? "254" + phone.substring(1) :
        phone.startsWith("+") ? phone.substring(1)
        : phone;

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
                PartyA: formattedPhone,
                PartyB: shortCode,
                PhoneNumber: formattedPhone,
                CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
                AccountReference: accountReference,
                TransactionDesc: transactionDesc
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const { MerchantRequestID, CheckoutRequestID } = response.data;
        console.log("STK Push API Response:", response.data);

        // Create pending payment record
        await Payment.create({
            user: req.user.userId,
            phone,
            amount: cart.total,
            merchantRequestID: MerchantRequestID,
            checkoutRequestID: CheckoutRequestID,
            status: 'pending',
        });

        console.log(`STK Push sent to ${formattedPhone} for amount ${cart.total}`),
        res.status(200).json({
            message: 'STK Push sent',
            data: { CheckoutRequestID, MerchantRequestID },
        });

    } catch (error) {
        console.error("STK Push Error:", error.response?.data || error.message);
        res.status(500).json({ message: "M-PESA STK Push Failed" });
    }
};


exports.mpesaCallback = async (req, res) => {
    try {
        const stkCallback = req.body?.Body?.stkCallback;
        const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

        let updateData = { 
            resultCode: ResultCode, 
            resultDesc: ResultDesc, 
            status: ResultCode === 0 ? 'success' : 'failed' 
        };

        if (ResultCode === 0) {
            const metadata = stkCallback.CallbackMetadata?.Item || [];
            const amount = metadata.find(i => i.Name === 'Amount')?.Value;
            const phone = metadata.find(i => i.Name === 'PhoneNumber')?.Value;
            const receipt = metadata.find(i => i.Name === 'MpesaReceiptNumber')?.Value;

            // Find payment record
            const payment = await Payment.findOne({ checkoutRequestID: CheckoutRequestID });
            if (payment) {
                const userId = payment.user;

                const { order } = await createOrderForUser(userId, CheckoutRequestID);

                payment.amount = amount;
                payment.phone = phone;
                payment.receipt = receipt;
                payment.resultCode = ResultCode;
                payment.resultDesc = ResultDesc;
                payment.status = "success";
                payment.order = order._id;

                await payment.save();

                console.log(`✅ Order ${order._id} created for user ${userId}`);

                return res.status(200).json({ 
                    message: "Payment success, order created", 
                    orderId: order._id 
                });
            }
        } else {
            console.log("❌ Payment failed:", ResultDesc);
            return res.status(400).json({ 
                message: "Payment failed", 
                reason: ResultDesc 
            });
        }

    } catch (error) {
        console.error("Callback processing error:", error);
        return res.status(500).json({ error: "Callback processing failed" });
    }
};





exports.getPaymentStatus = async (req, res) => {
  try {
    const { checkoutRequestID } = req.params;
    const payment = await Payment.findOne({ checkoutRequestID });
    if (!payment) return res.status(404).json({ 
        status: "pending",
        message: "Payment not found"
    });

    console.log("Order ID:", payment.order || "No order associated");
    console.log("Payment status:", payment.status);
    res.status(200).json({ 
        status: payment.status,
        resultCode: payment.resultCode,
        resultDesc: payment.resultDesc,
        orderId: payment.order || null
    });
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
