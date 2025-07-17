const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/Ecommerce";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // optional: stop server if DB fails
  }
};

module.exports = connectToMongo;
