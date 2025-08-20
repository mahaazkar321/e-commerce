const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create Order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, billingDetails, totalAmount, paymentMethod } = req.body;

    const order = new Order({
      user: req.user.userId,
      items,
      billingDetails,
      totalAmount,
      paymentMethod,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get logged-in user’s orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
