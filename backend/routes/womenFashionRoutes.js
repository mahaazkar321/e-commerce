
// routes/womenFashionRoutes.js
const express = require('express');
const router = express.Router();
const WomenFashion = require('../models/WomenFashion');

router.get('/', async (req, res) => {
  try {
    const products = await WomenFashion.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching products' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const featured = await WomenFashion.find({ isFeatured: true });
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching featured products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await WomenFashion.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching product' });
  }
});

module.exports = router;