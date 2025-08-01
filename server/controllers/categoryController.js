const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ message: 'Category name is required'})

            const existing = await Category.findOne({ name});
            if (existing) res.status(400).json({ message: 'Category already exist' });

            const newCategory = new Category({
                name,
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
        const category = await Category.findOne({slug});
        return res.status(200).json({
            category
        })
    } catch (error) {
        console.error('❌ Error in Category:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}