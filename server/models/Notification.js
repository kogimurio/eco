const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["order", "stock", "system"],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        default: {},
    },
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);