const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

// 🔧 Added from first block: require auth middleware
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create Order (user’s order)
// 🔧 Added from first block: added authMiddleware and user association
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, billingDetails, totalAmount, paymentMethod } = req.body;

    const order = new Order({
      user: req.user.userId, // 🔧 Associate order with logged-in user
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

// ✅ Update order status
// 🔧 Missing in first block, no changes needed here unless you want to protect it with auth
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // ✅ return updated doc
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get ALL orders
// 🔧 Optional: you may want to restrict this route to admin users in real applications
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔧 Added from first block: Get logged-in user’s orders only
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
