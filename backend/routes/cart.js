const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// 🔄 Get cart
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.cart || []);
});

// 🆕 Add/update cart
router.post('/', auth, async (req, res) => {
  const { cartItems } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { cart: cartItems },
    { new: true }
  );
  res.json(user.cart);
});

// DELETE single cart item
router.delete('/:id', auth, async (req, res) => {
  const productId = req.params.id;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter((item) => item.id !== productId);
    await user.save();

    res.json(user.cart);
  } catch (err) {
    console.error("Failed to delete item:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// 🧹 Clear cart (fix the route: should be DELETE '/')
router.delete('/', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, { cart: [] }, { new: true });
  res.json(user.cart);
});


module.exports = router;
