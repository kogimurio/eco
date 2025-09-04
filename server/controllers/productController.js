const Product = require('../models/Product');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');

//  Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, brand, category, stock, colour, size } = req.body;

    console.log('Received required');
    console.log('Files:', req.files);
    console.log('Body:', req.body);

    if (!name || !price || !description || !brand || !category || !stock || !colour || !size || !req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'All fields and at least one image are required',
      });
    }

    const thumbnailPath = req.files?.thumbnail?.[0]?.relativePath.replace(/\\/g, "/");
    const imagePaths = req.files?.images?.map(file => file.relativePath);

    const thumbnail = thumbnailPath[0];
    const otherImages = imagePaths.slice(1);

    const newProduct = new Product({
      name,
      price,
      description,
      brand,
      category,
      stock,
      size,
      colour,
      giftWrapping: req.body.giftWrapping === 'true' || req.body.giftWrapping === true,
      vintage: req.body.vintage || null,
      isClearance: req.body.isClearance === 'true' || req.body.isClearance === true,
      isBestSeller: req.body.isBestSeller === 'true' || req.body.isBestSeller === true,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
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

// Get products by filter
const getFilteredProducts = async (filter, res) => {
  try {
    const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .populate('category');
    return res.json({
      products,
      total: products.length
    });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}


// Filter products by brand, colour, size, vintage, price
exports.getFilterSidebarProducts = async (req, res) => {
  
  try {
    const { brand, colour, size, minPrice, maxPrice, vintage } = req.query;
    const filter = {};

    if (brand) filter.brand = brand;
    if (size) filter.size = size;
    if (colour) filter.colour = colour;
    if (vintage) filter.vintage = vintage;
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice)}
    };
    await getFilteredProducts(filter, res);
  } catch {
    console.error("Error in getFilterSidebarProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Get all Products
exports.getAllProducts = async (req, res) => {
  await getFilteredProducts({}, res);  
};

// Best sellers Products
exports.getBestSellers = async (req, res) => {
  await getFilteredProducts({ isBestSeller: true }, res);
}

// Featured Products
exports.getFeaturedProducts = async (req, res) => {
  await getFilteredProducts({ isFeatured: true }, res);
}

// Clearance Products
exports.getClearanceProducts = async (req, res) => {
  await getFilteredProducts({ isClearance: true }, res);
}

// New Products
exports.getNewProducts = async (req, res) => {
  const daysAgo = 30;
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - daysAgo);
  await getFilteredProducts({ createdAt: { $gte: dateLimit } }, res);
}

// Get a product by slug through Path parameter
exports.getProduct = async (req, res) => {
  const {slug} = req.params;
  try {
    const product = await Product.findOne({slug}).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({product});
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ message: 'Failed to load the product' });
  }
    
};

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
      stock,
      colour,
      size,
      giftWrapping,
      vintage,
      isClearance,
      isBestSeller,
      isFeatured
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
    if (size) product.stock = size;
    if (colour) product.stock = colour;
    if (giftWrapping) product.giftWrapping = req.body.giftWrapping === 'true' || req.body.giftWrapping === true;
    if (vintage) product.vintage = vintage;
    if (isClearance) product.isClearance = req.body.isClearance === 'true' || req.body.isClearance === true;
    if (isBestSeller) product.isBestSeller = req.body.isBestSeller === 'true' || req.body.isBestSeller === true;
    if (isFeatured) product.isFeatured = req.body.isFeatured === 'true' || req.body.isFeatured === true;

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail.length > 0 ) {
        const thumbnailPath = req.files.thumbnail[0].relativePath || req.files.thumbnail[0].secure_url;
        product.thumbnail = thumbnailPath;
      }

      if (req.files.images && req.files.length > 0 ) {
        const imagePaths = req.files.images.map(file => file.relativePath || file.secure_url);
        product.images = imagePaths;
      }
    }


    await product.save();

    console.log('Product updated:', product);
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

// Get products from category
exports.getRelatedProducts = async (req, res) => {
  const slug = req.params.slug;

  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const relatedProducts = await Product.find({
      category: product.category._id,
      slug: { $ne: slug }
    }).limit(6);

    res.json({
      relatedProducts
    })
  } catch (error) {
    console.log('Error fetching related products:', error);
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}



