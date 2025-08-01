// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    Actualprice: { type: Number, default: 0 },
    DiscountedPrice: { type: Number, default: 0 },
    Discount: { type: String, default: '' },
    ratings: { type: Number, default: 0 },
    images: [{ type: String }],
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
