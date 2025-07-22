const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');


// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.body;

    // Basic validation
    if (!productId) {
        return res.status(400).json({
            message: 'Product Id is required'
        });
    }

    try {
        // Fetch wishlist
        let wishlist = await Wishlist.findOne({ user: userId });

        // Create wishlist if it doesn't exist
        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                products: [productId]
            });
            await wishlist.save();
            return res.status(201).json({
                message: 'Product added to wishlist',
                wishlist
            });
        }

        // To restrict product duplicate
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({
                message: 'Product already in wishlist'
            });
        }

        // Add product and Save
        wishlist.products.push(productId);
        await wishlist.save();
        return res.status(201).json({
            message: 'Product added to wishlist',
            wishlist
        });
        
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ 
            message: "Error adding product to wishlist",
            error
        })
    }
}

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    const userId = req.user.userId;
    const { productId } = req.params;

    try {
        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId }},
            { new: true }
        ).populate("products");

        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            message: "Error removing product from wishlist",
            error
        });
    }
};

// Get user wishlist
exports.getUserWishlist = async (req, res) => {
    const userId = req.user.userId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId}).populate('products');

        res.status(200).json({
            success: true,
            wishlist
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}