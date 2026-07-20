const express = require("express");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
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