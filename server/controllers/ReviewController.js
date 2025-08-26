const Order = require('../models/Order');
const Review = require('../models/Review');
const Product = require('../models/Product');


exports.createReview = async (req, res) => {
    try {
        const userId = req.user.userId;
        const slug = req.params.slug;
        const { rating, comment } = req.body;

        // Find product by slug
        const product = await Product.findOne({ slug })
        // Basic validation
        if (!product) {
            return res.status(404).json({
                succes: false,
                message: 'Product not found'
            })
        }

        // Check if user has received the product
        const hasPurchased = await Order.exists({
            user: userId,
            status: 'delivered',
            "items.product": product._id
        });

        if (!hasPurchased) {
            return res.status(403).json({
                message: "You can only review products you have purchased and received"
            })
        }
        const review = new Review({
            user: userId,
            product: product._id,
            rating,
            comment
        });
        await review.save();

        return res.status(201).json({
            success: true,
            review
        });
    } catch (error) {
        console.error("Error creating review:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You already review this product"
            })
        }
        throw error;
    }
}

exports.getProductReviews = async (req, res) => {
    try {
        const slug = req.params.slug;

        // Find product by slug
        const product = await Product.findOne({ slug })
        // Basic validation
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }


        const reviews = await Review.find({ product: product._id })
        .sort({createdAt: -1})
        .populate('user', 'firstName');

        return res.status(200).json({
            success: true,
            reviews
        })
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}