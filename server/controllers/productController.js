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

    const thumbnailPath = req.files?.thumbnail?.[0]?.path.replace(/\\/g, "/");
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
      images: otherImages
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
  try {
    const filter = {};

    if (req.query.bestSeller === 'true') {
      filter.isBestSeller = true;
    }

    if (req.query.featured === 'true') {
      filter.isFeatured = true
    }

    if (req.query.clearance === 'true') {
      filter.isClearance = true
    }

    const products = await Product.find(filter);
    res.json({
      products,
      total: products.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error in fetching products:', error });
  }
    
};

// Get a product by slug through Path parameter
exports.getProduct = async (req, res) => {
  const {slug} = req.params;
  try {
    const product = await Product.findOne({slug});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({product});
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ message: 'Failed to load the product' });
  }
    
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

    console.log('Files:', req.files);
    console.log('Body:', req.body);

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

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail.length > 0 ) {
        const thumbnailPath = req.files.thumbnail[0].path || req.files.thumbnail[0].secure_url;
        product.thumbnail = thumbnailPath;
      }

      if (req.files.images && req.files.length > 0 ) {
        const imagePaths = req.files.images.map(file => file.path || file.secure_url);
        product.images = imagePaths;
      }
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

        await product.deleteOne();
        res.json({ message: 'Product and image deleted successfully' });
    } catch (error) {
        console.error('Error deleting product and image:', error);
        res.status(500).json({ message: 'Error deleting product and image'});
    }
};

