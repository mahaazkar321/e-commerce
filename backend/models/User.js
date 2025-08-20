const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // isAdmin: { type: Boolean, default: false },
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      images: [String],
    },
  ],

  wishlist: [
    {
      _id: String, // use string to store product._id
      name: String,
      price: Number,
      image: String,
      images: [String],
      ratings: Number,
      Discount: String,
      DiscountedPrice: Number,
      Actualprice: Number,
      category: String, // ✅ crucial for your fix
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
