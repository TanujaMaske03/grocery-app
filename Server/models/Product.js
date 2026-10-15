const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 4.0,
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
    },

    isSummerSale: {
      type: Boolean,
      default: false,
    },

    isOrganicWeek: {
      type: Boolean,
      default: false,
    },

    freeDelivery: {
      type: Boolean,
      default: false,
    },

    promotions: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

module.exports = mongoose.model("Product", productSchema);