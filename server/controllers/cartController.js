const Cart = require('../models/Cart');
const Product = require('../models/Product');


// Create cart
exports.addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    // Basic validation
    if (!productId || quantity < 1) {
        return res.status(400).json({
            message: 'Invalid product or quantity'
        });
    }

    try {
        // Fetch the cart
        let cart = await Cart.findOne({ user: userId });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
                total: 0
            });
        }

        // Fetch product id
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        // Add product quantity
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        // Calculate total
        const updatedItems = await Promise.all(cart.items.map(async item => {
            const product = await Product.findById(item.product);
            return product ? item.quantity * product.price : 0;
        }));
        cart.total = updatedItems.reduce((sum, val) => sum + val, 0);

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart
        });
    } catch (error) {
        console.error("caart Error:", error);
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
}

exports.getCart = async (req, res) => {
    const userId = req.user.userId

    try {
        const cart = await Cart.findOne({ user: userId}).populate('items.product');
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }
        console.log("Cart with populated products:", cart);
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        console.log("Error fetching cart:", error);
        res.status(500).json({
            success: false,
            error
        });
    }
}