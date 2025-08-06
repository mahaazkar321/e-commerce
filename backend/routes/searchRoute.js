const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const WomenFashion = require('../models/WomenFashion');
const Electronics = require('../models/Electronics');

const HealthBeauty = require('../models/HealthBeauty');
const HomeaandLifestyle = require('../models/HomeaandLifestyle');
const MenFashion = require('../models/MenFashion');
const sports = require('../models/sports');


// Unified search across all collections
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Search across all collections simultaneously
    const results = await Promise.all([
      Medicine.find({ name: { $regex: query, $options: 'i' } }),
      WomenFashion.find({ name: { $regex: query, $options: 'i' } }),
      Electronics.find({ name: { $regex: query, $options: 'i' } }),
        HealthBeauty.find({ name: { $regex: query, $options: 'i' } }),
        HomeaandLifestyle.find({ name: { $regex: query, $options: 'i' } }),
        MenFashion.find({ name: { $regex: query, $options: 'i' } }),
         sports.find({ name: { $regex: query, $options: 'i' } }),
     
    ]);

    // Flatten the results array
    const allResults = results.flat();
    
    res.json(allResults);
  } catch (error) {
    res.status(500).json({ error: 'Server error during search' });
  }
});

module.exports = router;