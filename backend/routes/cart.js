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

// 🧹 Clear cart
router.delete('/', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userId, { cart: [] }, { new: true });
  res.json(user.cart);
});

module.exports = router;
