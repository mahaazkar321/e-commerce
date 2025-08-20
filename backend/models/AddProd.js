// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: String, required: true },
  images: [String],
  stock: Number,
  ratings: Number,
  isFeatured: Boolean,
}, { collection: 'products' }); // Explicit collection name

module.exports = mongoose.model('Product', ProductSchema);