const mongoose = require('mongoose');

const FlashSalesSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  Actualprice: Number,
  DiscountedPrice: Number,
  Discount: String,
  category: String,
  images: [String],
  stock: Number,
  ratings: Number,
  isFeatured: Boolean,
});

module.exports = mongoose.model('FlashSales', FlashSalesSchema);
