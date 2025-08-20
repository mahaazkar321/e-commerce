// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
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

// POST - Add new product
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, stock, ratings, isFeatured } = req.body;
    
    // Process uploaded images
    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      stock: parseInt(stock),
      ratings: parseFloat(ratings),
      isFeatured: isFeatured === 'true'
    });

    await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
});

module.exports = router;