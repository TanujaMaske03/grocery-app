const express = require("express");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

// ============================
// Add Product
// ============================
router.post("/add", addProduct);

// ============================
// Get All Products
// ============================
router.get("/", getProducts);

// ============================
// Get Featured Products
// ============================
router.get("/featured", getFeaturedProducts);

// ============================
// Get Products By Category
// ============================
router.get("/category/:category", getProductsByCategory);

// ============================
// Search Products
// ============================
router.get("/search", searchProducts);

// ============================
// Get Product By ID
// ============================
router.get("/:id", getProductById);

// ============================
// Update Product
// ============================
router.put("/:id", updateProduct);

// ============================
// Delete Product
// ============================
router.delete("/:id", deleteProduct);

module.exports = router;