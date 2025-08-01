const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware: Verify JWT Token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ GET: Fetch user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.wishlist || []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// ✅ POST: Add an item to wishlist
router.post('/', auth, async (req, res) => {
  const {
    id,
    name,
    price,
    image,
    images,
    ratings,
    Discount,
    DiscountedPrice,
    Actualprice,
    category,
  } = req.body;

  try {
    const user = await User.findById(req.userId);

    const alreadyExists = user.wishlist.some(
      (item) => item._id === id && item.category === category
    );

    if (!alreadyExists) {
      user.wishlist.push({
        _id: id,
        name,
        price,
        image,
        images,
        ratings,
        Discount,
        DiscountedPrice,
        Actualprice,
        category,
      });
      await user.save();
    }

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
});

// ✅ DELETE: Remove a single item from wishlist and DB
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { category } = req.query;

  try {
    const user = await User.findById(req.userId);

    // Remove from wishlist array
    user.wishlist = user.wishlist.filter(
      (item) => !(item._id === id && item.category === category)
    );

    await user.save();

    // Also remove the product from DB
    await Product.findOneAndDelete({ _id: id, category });

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from wishlist and DB' });
  }
});

// ✅ DELETE: Clear all wishlist items (user only)
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // Optional: delete all wishlist products from DB (if you want)
    const idsToDelete = user.wishlist.map((item) => item._id);
    await Product.deleteMany({ _id: { $in: idsToDelete } });

    user.wishlist = [];
    await user.save();

    res.json([]);
  } catch (err) {
    res.status(500).json({ message: 'Error clearing wishlist' });
  }
});

module.exports = router;
