const connectToMongo=require('./config/db')
const express = require('express');
const cors = require('cors');
const path = require('path');

// Add this line before your routes

const womenFashionRoutes = require('./routes/womenFashionRoutes');

const MenFashionRoute = require('./routes/MenFashionRoute');

const HomeaandLifestyleRoutes = require('./routes/HomeandLifestyleRoutes');

const app = express();
const PORT = 5000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
connectToMongo();

app.use('/api/woman-fashion', womenFashionRoutes);

app.use('/api/men-fashion', MenFashionRoute );

app.use('/api/home-and-lifestyle', HomeaandLifestyleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

