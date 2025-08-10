const mongoose = require('mongoose');
const slugify = require('slugify')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, unique: true, uppercase: true, minlength: 2, maxlength: 5 },
    defaultWeight: { type: Number, default: 0.5 },
    description: { type: String },
    slug: { type: String, unique: true },
    productCount: { type: Number, default: 0 }
}, { timestamps: true });

categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    // If code is not set, auto-genarate it form name
    if (!this.code) {
        this.code = this.name.substring(0, 3).toUpperCase();
    }
    next();
})

module.exports = mongoose.model('Category', categorySchema)