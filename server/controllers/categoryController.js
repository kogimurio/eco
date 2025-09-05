const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !req.files?.image) return res.status(400).json({ message: 'Name and image fields are required'})



            const existing = await Category.findOne({ name});
            if (existing) res.status(400).json({ message: 'Category already exist' });

            const imageFile = req.files.image[0].relativePath;


            const newCategory = new Category({
                name,
                image: imageFile,
            });
            await newCategory.save();

            return res.status(201).json({
                message: 'Category created',
                category: newCategory,
            });
    } catch (error) {
        console.error('❌ Error in Category:', error)
        return res.status(500).json({ message: 'Error in Category' })
    }
}


// Fetch all categories
exports.getCategories = async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json({
            category
        })
    } catch (error) {
        console.error('❌ Error in Category:', error)
        return res.status(500).json({ message: 'Error in Category' })
    }
}

// Fetch category by slug
exports.getCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const { brand, colour, size, minPrice, maxPrice, vintage } = req.query;

        const filter = {};

        if (brand) filter.brand = brand;
        if (size) filter.size = size;
        if (colour) filter.colour = colour;
        if (vintage) filter.vintage = vintage;
        if (minPrice && maxPrice) {
        filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice)}
        };

        const category = await Category.findOne({slug});
        const products = await Product.find({ category, ...filter })
        return res.status(200).json({
            category,
            products
        })
    } catch (error) {
        console.error('❌ Error in Category:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}