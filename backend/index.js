const connectToMongo=require('./config/db')
const express = require('express');
const cors = require('cors');
const womenFashionRoutes = require('./routes/womenFashionRoutes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
connectToMongo();
app.use('/api/women-fashion', womenFashionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

