const Cart = require('../models/Cart');
const Product = require('../models/Product');


// Create cart
exports.addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    console.log("🛒 [Add to Cart] Request received:");
    console.log("  ➤ Product ID:", productId);
    console.log("  ➤ Quantity:", quantity);
    console.log("  ➤ User ID:", userId);

    // Basic validation
    if (!productId || quantity < 1) {
        console.warn("❌ Invalid input: Missing productId, quantity, or userId");
        return res.status(400).json({
            message: 'Invalid product or quantity'
        });
    }

    try {
        // Fetch the cart
        let cart = await Cart.findOne({ user: userId });

        console.log("🛒 Current Cart:", cart);

        // Create cart if it doesn't exist
        if (!cart) {
            console.log("🆕 Creating new cart for user:", userId);
            cart = new Cart({
                user: userId,
                items: [],
                total: 0
            });
        }
        console.log("Cart:", cart)

        // Fetch product id
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        console.log("🔍 Product already in cart at index:", existingItemIndex);

        // Add or update product quantity
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
            console.log("🔄 Updated quantity for existing product.");
        } else {
            cart.items.push({ product: productId, quantity });
            console.log("➕ Added new product to cart.");
        }

        // Calculate cart total
        const updatedItems = await Promise.all(cart.items.map(async item => {
            const product = await Product.findById(item.product);
            if (!product) {
                console.warn(`⚠️ Product not found: ${item.product}`);
                return 0;
            }
            return item.quantity * product.price;
        }));
        cart.total = updatedItems.reduce((sum, val) => sum + val, 0);

        console.log("💰 New Cart Total:", cart.total);

        await cart.save();
        console.log("✅ Cart saved successfully!");

        res.status(200).json({
            message: "Product added to cart",
            cart
        });
    } catch (error) {
        console.error("🔥 [Add to Cart] Error:", error);
        res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
}

exports.getCartProduct = async (req, res) => {
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

exports.deleteCartProduct = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        console.log("Recived request to delete product from cart")
        console.log("User ID:", userId);
        console.log("Product ID:", productId);

        // Basic validation
        if (!productId) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const cart = await Cart.findOne({ user: userId })
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        // Filter out the product form items array
        const updatedItems = cart.items.filter(
            item => item.product.toString() !== productId
        );

        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }
        cart.items = updatedItems;

        // Recalculate cart total
        const updatedTotal = await Promise.all(
            cart.items.map(async item => {
                const product = await Product.findById(item.product);
                if (!product) {
                console.warn(`⚠️ Product not found: ${item.product}`);
                return 0;
            }
                return product ? item.quantity * product.price : 0;
            })
        );
        cart.total = updatedTotal.reduce((sum, val) => sum + val, 0);
        
        await cart.save()
        console.log("Product removed from cart");
        return res.status(200).json({
            message: "Product removed from cart",
            cart
        });
    } catch (error) {
        console.log("Error removing Product from cart:", error);
        res.status(500).json({
            message: "Enternal server error"
        });
    }
}