const Category = require('../models/Category');

exports.createCategory = async (req, res)=> {
    const { name } = req.body;


    try {
        if (!name) {
            return res.status(400).json({ message: 'Name field is required' });
        }

        // New category
        const newCategory = new Category({
            name
        })
        await newCategory.save();

        res.status(201).json({ 
            message: 'New category created successful',
            category: newCategory 
        });
    } catch (error) {
        console.error('Error in category creation:', error);
        res.status(500).json({ message: 'Failed to create category'});
    }
}