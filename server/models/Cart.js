const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    items: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)