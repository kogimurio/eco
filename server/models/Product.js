const mongoose = require('mongoose');
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, require: true},
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        require: true
    },
    stock: { type: Number, required: true },
    image: [{ type: String, required: true }],
    slug: { type: String, unique: true},
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true});
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);

