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

    const thumbnailPath = req.files?.thumbnail?.[0]?.path;
    const imagePaths = req.files?.images?.map(file => file.path);

    const thumbnail = imagePaths[0];
    const otherImages = imagePaths.slice(1);

    const newProduct = new Product({
      name,
      price,
      description,
      brand,
      category,
      stock,
      thumbnail,
      image: otherImages
    });

    await newProduct.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });

  } catch (error) {
    console.error('❌ Error in createProduct:', error);
    next(error); // Pass the error to global handler
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
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const {
      name,
      price,
      description,
      brand,
      category,
      stock
    } = req.body;

    // Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found'})
    }

    // Update product
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => file.path || file.secure_url || file.filename);

      product.thumbnail = imagePaths[0];
      product.image = imagePaths.slice(1);
    }

    await product.save();

    return res.status(200).json({
      message: 'Product updated',
      product: product
    });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    next(error);
  }
    
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

