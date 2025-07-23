const mongoose = require('mongoose');

const WomenFashionSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  stock: Number,
  ratings: Number,
  isFeatured: Boolean,
});

module.exports = mongoose.model('WomenFashion', WomenFashionSchema);
