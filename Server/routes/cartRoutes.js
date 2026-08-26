const express = require("express");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Get Logged In User Cart
// ==========================
router.get("/", protect, getCart);

// ==========================
// Add Product To Cart
// ==========================
router.post("/", protect, addToCart);

router.put("/:id", protect, updateQuantity);

// ==========================
// Remove Product From Cart
// ==========================
router.delete("/:id", protect, removeFromCart);

// ==========================
// Clear Entire Cart
// ==========================
router.delete("/", protect, clearCart);

module.exports = router;