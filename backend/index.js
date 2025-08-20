const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectToMongo = require('./config/db');
connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const womenFashionRoutes = require('./routes/womenFashionRoutes');
const ElectronicsRoute = require('./routes/ElectronicsRoute');
const MenFashionRoute = require('./routes/MenFashionRoute');
const HealthBeauty = require('./routes/HealthBeauty');
const HomeAndLifestyleRoutes = require('./routes/HomeAndLifestyleRoutes');
const MedicineRoutes = require('./routes/MedicineRoute');
const authRoutes = require('./routes/Auth');
const sportsRoute = require('./routes/sportsRoute');
const BestSelling = require('./routes/BestSellingRoute');
const FlashSales = require('./routes/FlashSalesRoute');
const AllProductsRoutes = require('./routes/AllProductsRoute');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const searchRoutes = require('./routes/searchRoute');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


// API Endpoints
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/woman-fashion', womenFashionRoutes);
app.use('/api/appliance-electronics', ElectronicsRoute);
app.use('/api/men-fashion', MenFashionRoute);
app.use('/api/health-and-beauty', HealthBeauty);
app.use('/api/home-and-lifestyle', HomeAndLifestyleRoutes);
app.use('/api/syrup-and-medicine', MedicineRoutes);
app.use('/api/sports-and-outdoor', sportsRoute);
app.use('/api/best-selling', BestSelling);
app.use('/api/flash-sales', FlashSales);
app.use('/api/all-products', AllProductsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
