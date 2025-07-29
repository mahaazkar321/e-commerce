const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectToMongo = require('./config/db');

// ✅ Connect to MongoDB
connectToMongo();

// ✅ Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const womenFashionRoutes = require('./routes/womenFashionRoutes');
const ElectronicsRoute = require('./routes/ElectronicsRoute');
const MenFashionRoute = require('./routes/MenFashionRoute');
const HealthBeauty = require('./routes/HealthBeauty');
const HomeaandLifestyleRoutes = require('./routes/HomeandLifestyleRoutes');
const authRoutes = require('./routes/Auth');

// ✅ API Endpoints
app.use('/api/woman-fashion', womenFashionRoutes);
app.use('/api/appliance-electronics', ElectronicsRoute);
app.use('/api/men-fashion', MenFashionRoute);
app.use('/api/health-and-beauty', HealthBeauty);
app.use('/api/home-and-lifestyle', HomeaandLifestyleRoutes);
app.use('/api/auth', authRoutes); // Signup/Login routes

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
