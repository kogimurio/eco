const Order = require('../models/Order');
const User = require('../models/User');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Address = require('../models/Address');
const transporter = require('../utils/mailer');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const { getIO } = require('../socket');
const mongoose = require("mongoose");


exports.createOrderForUser = async (userId, checkoutRequestID) => {
    const userIdStr = normalizeUserId(userId);
    const user = await User.findById(userIdStr);

    const io = getIO();

    const cart = await Cart.findOne({ user: userIdStr }).populate('items.product');
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    // Create order
    const order = new Order({
        user: userIdStr,
        total_price: cart.total,
        checkoutRequestID: req.body.checkoutRequestID,
        items: cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        })),
        status: 'processing',
    });
    await order.save();

    // Emit order creation event
    io.to("admins").emit("order_created", {
        id: order._id,
        user: user.email,
        total: order.total_price,
        status: order.status,
        createdAt: order.createdAt
    });

    // Deduct stock + emit stock update
    for (const item of cart.items) {
        item.product.stock = Math.max(item.product.stock - item.quantity, 0);
        await item.product.save();

        io.to("admins").emit("stock_updated", {
            product: item.product.name,
            stock: item.product.stock
        });
    }

    // Create order items
    for (const item of cart.items) {
        await OrderItem.create({
            order: order._id,
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        });
    }

    // Generate invoice & send email
    const invoiceHTML = await ejs.renderFile(
        path.join(__dirname, '../templates/invoice.ejs'),
        { user, order, items: cart.items }
    );

    pdf.create(invoiceHTML).toBuffer(async (err, buffer) => {
        if (err) {
            console.error("PDF generation error:", err);
            return;
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your Order Invoice - Fashionova',
            text: 'Thanks for your purchase! Please find your invoice attached.',
            attachments: [
                {
                    filename: `invoice-${order._id}.pdf`,
                    content: buffer
                }
            ]
        });
    });

    // Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    // Respond to client
    res.status(201).json(order);
};
