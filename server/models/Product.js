const mongoose = require('mongoose');
const slugify = require('slugify')

const categoryWeights = {
    'Clothing': 0.3,
    'Shoes': 1.0,
    'Genaral': 0.5
};

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true, immutable: true },
    condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'new' },
    weight: { type: Number },
    giftWrapping: { type: Boolean, default: false },
    shipping: { type: String, enum: ['free', 'flat-rate', 'calculated'], default: 'free' },
    vintage: { type: Number },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    isClearance: { type: Boolean, default: false},
    isBestSeller: { type: Boolean, default: false},
    isFeatured: { type: Boolean, default: false},
    slug: { type: String, unique: true},
}, { timestamps: true });


// Pre-save hook to auto-generate slug, SKU, and weight
productSchema.pre('save', async function (next) {
    // Genarate slugif name changes
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true});
    }

    // Fetch category name
    const categoryDoc = await mongoose.model('Category').findById(this.category);
    if (!categoryDoc) {
        return next(new Error('Category not Found'));
    }

    // Auto-set weight if missing
    if (!this.weight) {
        this.weight = categoryDoc.defaultWeight || 0.5;
    }

    // Auto-genarate SKU if product is new
    if (this.isNew) {
        const categoryCode = categoryDoc.code || categoryDoc.name.substring(0, 3).toUpperCase();
        const brandCode = this.brand.substring(0, 3).toUpperCase();
        const count = await mongoose.model('Product').countDocuments();

        this.sku = `${categoryCode}-${brandCode}-${String(count + 1).padStart(5, '0')}`;
    }

    next();
});

productSchema.post('save', async function () {
    const Product = mongoose.model('Product');
    const Category = mongoose.model('Category');

    const count = await Product.countDocuments({ category: this.category });
    await Category.findByIdAndUpdate(this.category, { productCount: count });
});

module.exports = mongoose.model('Product', productSchema);

