const Product = require("../models/Product");
const { getCategoryFilter, getPromotionFilter } = require("../utils/categoryMatcher");

// ============================
// Add Product
// ============================
const addProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, image, originalPrice, description, isSummerSale, isOrganicWeek, freeDelivery, promotions, tags } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      image,
      originalPrice,
      description,
      isSummerSale,
      isOrganicWeek,
      freeDelivery,
      promotions,
      tags
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Products (with filters)
// ============================
const getProducts = async (req, res) => {
  try {
    const { category, search, q, minPrice, maxPrice, price, rating, minRating, discount, minDiscount, promotion, sort } = req.query;

    const filterConditions = [];

    // Search query
    const searchQuery = (search || q || "").trim();
    if (searchQuery) {
      filterConditions.push({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { category: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { tags: { $regex: searchQuery, $options: "i" } }
        ]
      });
    }

    // Category filter
    if (category && category !== 'All' && category !== 'all') {
      const catFilter = getCategoryFilter(category);
      if (catFilter) {
        filterConditions.push(catFilter);
      }
    }

    // Promotion filter
    if (promotion) {
      const promoFilter = getPromotionFilter(promotion);
      if (promoFilter) {
        filterConditions.push(promoFilter);
      }
    }

    // Price range filter
    let parsedMinPrice = minPrice ? Number(minPrice) : null;
    let parsedMaxPrice = maxPrice ? Number(maxPrice) : null;
    if (price && price.includes('-')) {
      const [pMin, pMax] = price.split('-').map(Number);
      if (!isNaN(pMin)) parsedMinPrice = pMin;
      if (!isNaN(pMax)) parsedMaxPrice = pMax;
    }
    if (parsedMinPrice !== null || parsedMaxPrice !== null) {
      const priceQuery = {};
      if (parsedMinPrice !== null) priceQuery.$gte = parsedMinPrice;
      if (parsedMaxPrice !== null) priceQuery.$lte = parsedMaxPrice;
      filterConditions.push({ price: priceQuery });
    }

    // Rating filter
    const parsedRating = Number(rating || minRating);
    if (!isNaN(parsedRating) && parsedRating > 0) {
      filterConditions.push({ rating: { $gte: parsedRating } });
    }

    // Build final query
    const query = filterConditions.length > 0 ? { $and: filterConditions } : {};

    // Sorting
    let sortQuery = {};
    switch (sort) {
      case 'price-low':
        sortQuery = { price: 1 };
        break;
      case 'price-high':
        sortQuery = { price: -1 };
        break;
      case 'rating':
        sortQuery = { rating: -1 };
        break;
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      default:
        sortQuery = { isFeatured: -1, _id: 1 };
        break;
    }

    let products = await Product.find(query).sort(sortQuery);

    // In-memory filter for calculated discount if requested
    const targetDiscount = Number(discount || minDiscount);
    if (!isNaN(targetDiscount) && targetDiscount > 0) {
      products = products.filter(p => {
        if (!p.originalPrice || p.originalPrice <= p.price) return false;
        const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        return disc >= targetDiscount;
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Product By ID
// ============================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Update Product
// ============================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Delete Product
// ============================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Featured Products
// ============================
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Products By Category
// ============================
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const catFilter = getCategoryFilter(category) || { category: { $regex: new RegExp(`^${category}$`, "i") } };
    const products = await Product.find(catFilter);
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Search Products
// ============================
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q || "";
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ]
    });
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
};