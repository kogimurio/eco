const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    email: { type: String, required: true },
    phone: { 
        type: String, 
        required: true,
        match: [/^\+?[0-9]{10,15}$/, 'Invalid phone number']
    },
    addressLine: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: { type: String, required: true},
    country: { type: String, required: true},
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema)