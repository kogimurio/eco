const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  merchantRequestID: String,
  checkoutRequestID: String,
  resultCode: Number,
  resultDesc: String,
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
