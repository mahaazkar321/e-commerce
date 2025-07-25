const connectToMongo=require('./config/db')
const express = require('express');
const cors = require('cors');
const path = require('path');

// Add this line before your routes

const womenFashionRoutes = require('./routes/womenFashionRoutes');
const app = express();
const PORT = 5000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
connectToMongo();

app.use('/api/woman-fashion', womenFashionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

