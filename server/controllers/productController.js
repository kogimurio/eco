const Product = require('../models/Product');

//  Create a new product
exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
};

// Get all products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// Get a product by Id through Path parameter
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// Get a product by Id through Query string
// exports.getProductByQuery = async (req, res) => {
//     try {
//         const { id } = req.query;
//         if (!id) {
//             return res.status(400).json({ message: 'Product ID is required' });
//         }
//         const product = await Product.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

// Update a product
exports.updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
};

