const connectToMongo=require('./db')
const express = require('express');
const app = express();
connectToMongo();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});