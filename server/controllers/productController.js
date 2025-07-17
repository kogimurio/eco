const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

//  Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, brand, category, stock } = req.body;

    console.log('Received required');
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    if (!name || !price || !description || !brand || !category || !stock || !req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'All fields and at least one image are required',
      });
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new Product({
      name,
      price,
      description,
      brand,
      category,
      stock,
      image: imagePaths
    });

    await newProduct.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });

  } catch (err) {
    console.error('❌ Error in createProduct:', err);
    next(err); // Pass the error to global handler
  }
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
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        // Delete image from cloudinary
        // const deletePromises = product.image.map(imgUrl => {
        //     const publicId = imgUrl.split('/').slice(-1).split('.')[0]; // extract image ID
        //     return cloudinary.uploader.destroy(`ecoapp/products/${publicId}`);
        // });
        // await Promise.all(deletePromises)

        await Product.deleteOne();
        res.json({ message: 'Product and image deleted successfully' });
    } catch (error) {
        console.error('Error deleting product and image:', error);
        res.status(500).json({ message: 'Error deleting product and image'});
    }
};

