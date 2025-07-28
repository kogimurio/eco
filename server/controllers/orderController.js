const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Address = require('../models/Address');

exports.createOrder = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Fetch cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        // Basic validation
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        // Create order
        const order = new Order({
            user: userId,
            total_price: cart.total,
            status: 'pending',
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }))
        });

        await order.save();

        // Create individual order items
        for (const item of cart.items) {
            await OrderItem.create({
                order: order._id,
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });
        }

        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: order._id,
            order
        })
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({
            message: 'Internal server error'
        });
    };
}

// Get user order per user
exports.getOrder =async (req, res) => {
    try {
            const userId = req.user.userId;

            const order = await Order.findOne({ user: userId })
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName email')
            .populate('items.product');

            if (!order) {
                return res.status(200).json({
                    success: true,
                    order: null
                });
            }

            res.status(200).json({
                success: true,
                order
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
            const { id: orderId } = req.params;

            const orderItems = await OrderItem.find({ order: orderId })
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
