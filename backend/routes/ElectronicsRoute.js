const express = require('express');
const router = express.Router();
const Electronics = require('../models/Electronics');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Electronics.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching products' });
  }
});

// GET featured products
router.get('/featured', async (req, res) => {
  try {
    const featured = await Electronics.find({ isFeatured: true });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured products' });
  }
});

module.exports = router;
