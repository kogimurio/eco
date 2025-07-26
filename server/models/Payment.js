const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  merchantRequestID: String,
  checkoutRequestID: String,
  resultCode: Number,
  resultDesc: String,
  status: { type: String, enum: ['success', 'failed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
