const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser, 
  updateUser,// ✅ Import the new function
} = require("../controllers/authController");

const { protect } = require("../middleware/auth"); // ✅ Import protect middleware

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// ✅ Get current user (protected)
router.get("/me", protect, getCurrentUser);

router.put("/update", protect, updateUser); // ✅ Add this


module.exports = router;