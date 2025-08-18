const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
  },
  order: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order',
      required: false
  },
  phone: String,
  amount: Number,
  merchantRequestID: String,
  checkoutRequestID: String,
  resultCode: Number,
  resultDesc: String,
  receipt: String,
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
