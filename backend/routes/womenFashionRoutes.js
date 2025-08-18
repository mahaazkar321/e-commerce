
// routes/womenFashionRoutes.js
const express = require('express');
const router = express.Router();
const WomenFashion = require('../models/WomenFashion');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

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

// POST - Add new WomenFashion product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, stock, ratings, isFeatured } = req.body;
    
    // Process uploaded images
    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    const newProduct = new WomenFashion({
      name,
      description,
      price,
      category: 'Woman Fashion', // Explicitly set the category
      images,
      stock: parseInt(stock),
      ratings: parseFloat(ratings),
      isFeatured: isFeatured === 'true'
    });

    await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Woman Fashion product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error adding Woman Fashion product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add Woman Fashion product',
      error: error.message
    });
  }
});

module.exports = router;