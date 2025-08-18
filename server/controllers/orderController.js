const Order = require('../models/Order');
const User = require('../models/User');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Address = require('../models/Address');
const Notification = require('../models/Notification');
const transporter = require('../utils/mailer');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const { getIO } = require('../socket');


exports.createOrderForUser = async (userId, checkoutRequestID) => {
    const notifications = [];
    try {
        const user = await User.findById(userId);
            if (!user) throw new Error("User not found"); 

        const io = getIO();

        // Fetch cart
        const cart = await Cart.findOne({ user: user._id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // Create order
        const order = new Order({
            user: userId,
            total_price: cart.total,
            checkoutRequestID: checkoutRequestID,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            status: 'processing',
        });
        await order.save();

        // Create notification
        const orderNotification = new Notification({
            type: "order",
            message: `New order placed by ${user.email}`,
            data: { orderId: order._id },
        })
        await orderNotification.save();
        notifications.push(orderNotification);

        io.emit("test_event", { msg: "Hello from backend" });
        
        // Emit order creation event
        io.to("admins").emit("order_created", {
            orderId: order._id,
            user: user.email,
            total: order.total_price,
            status: order.status,
            createdAt: order.createdAt
        });

        // Deduct stock + emit stock update
        for (const item of cart.items) {
            item.product.stock = Math.max(item.product.stock - item.quantity, 0);
            await item.product.save();

            // Only trigger if stock < 5
            if (item.product.stock < 5) {
                // Create notification
                const stockNotification = new Notification({
                    type: "stock",
                    message: `Low stock ${item.product.name} (remaining ${item.product.stock})`,
                    data: { product: item.product.name, stock: item.product.stock },
                })
                await stockNotification.save();
                notifications.push(stockNotification);

                // Emit stock update
                io.to("admins").emit("stock_updated", {
                    product: item.product.name,
                    stock: item.product.stock
                });
            }
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
            {
                user,
                order,
                items: cart.items
            }
        );

        pdf.create(invoiceHTML).toBuffer(async (err, buffer) => {
            if (err) {
                console.log("PDF generation error:", err);
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

        return { order, notifications };
    } catch (err) {
        console.error("Order creation error:", err);
        throw err;
    }
}


exports.createOrder = async (req, res) => {
    try {
        const { order, notifications } = await createOrderForUser(req.user.userId, req.body.checkoutRequestID);
        res.status(201).json({ order, notifications });
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




// Get order per user
exports.getOrder =async (req, res) => {
    try {
            const userId = req.user.userId;

            const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate('items.product');

            if (!orders) {
                return res.status(200).json({
                    success: true,
                    orders: null
                });
            }

            res.status(200).json({
                success: true,
                orders
            })

    } catch (error) {
        console.log('Error fetching order:', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// Get all users orders
exports.getAllOrder =async (req, res) => {
    try {

            const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate('user', 'firstName')
            .populate('items.product');

            if (!orders) {
                return res.status(200).json({
                    success: true,
                    orders: null
                });
            }

            res.status(200).json({
                success: true,
                orders
            })

    } catch (error) {
        console.log('Error fetching orders:', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// Get order items in order per user
exports.getOrderItems =async (req, res) => {
    try {
            const { id } = req.params;

            const orderItems = await OrderItem.find({ order: id })
            .populate('product')
            .populate({
                path: 'order',
                populate: { path: 'user', select: 'firstName email' } // optional
            });

            if (!orderItems || orderItems.length === 0) {
                return res.status(200).json({
                    success: true,
                    orderItems: null,
                    address: null
                });
            }

            const userId = orderItems[0].order.user._id;

            const address = await Address.findOne({ user: userId });

            res.status(200).json({
                success: true,
                orderItems,
                address
            })

    } catch (error) {
        console.log('Error fetching order items:', error)
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// Get just paid order
exports.getPaidOrder =async (req, res) => {
    try {

            const order = await Order.findById(req.params.id).populate('user');

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            res.status(200).json({
                success: true,
                order
            })

    } catch (error) {
        console.log('Error fetching paid order:', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Oder status
exports.statusChange = async (req, res) => {
    try {
        const { id } = req.params;

        const { status: newStatus } = req.body;

        // Fetch order
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Update Order status
        order.status = newStatus;
        await order.save()

        return res.status(200).json({
            message: "Order Updated",
            order
        })
    } catch (error){
        console.log("Error updating order status:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


