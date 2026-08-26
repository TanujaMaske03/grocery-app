const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Product = require("../models/Product");

let mongoServer;

const seedProducts = [
  { name: 'Fresh Organic Apples', price: 399.00, originalPrice: 559.00, category: 'Fruits', image: '/images/products/apple.jpg', rating: 4.5, stock: 50, quantity: 50, isNew: true, isFeatured: true, isTrending: true, description: 'Fresh, juicy organic apples imported from Kashmir.' },
  { name: 'Premium Bananas', price: 159.00, originalPrice: 199.00, category: 'Fruits', image: '/images/products/banana.jpg', rating: 4.8, stock: 30, quantity: 30, isNew: false, isFeatured: true, isTrending: true, description: 'Sweet and nutritious yellow bananas from Robusta variety.' },
  { name: 'Fresh Whole Milk', price: 79.00, originalPrice: 99.00, category: 'Dairy', image: '/images/products/milk.jpg', rating: 4.3, stock: 20, quantity: 20, isNew: true, isFeatured: false, isTrending: false, description: 'Pure pasteurized cow milk rich in cream.' },
  { name: 'Organic Spinach', price: 49.00, originalPrice: 69.00, category: 'Vegetables', image: '/images/products/spinach.jpg', rating: 4.6, stock: 40, quantity: 40, isNew: false, isFeatured: true, isTrending: false, description: 'Freshly harvested organic spinach leaves, washed and ready.' },
  { name: 'Whole Wheat Bread', price: 59.00, originalPrice: 79.00, category: 'Bakery', image: '/images/products/bread.jpg', rating: 4.4, stock: 25, quantity: 25, isNew: true, isFeatured: true, isTrending: true, description: 'High-fiber whole wheat bread baked fresh daily.' },
  { name: 'Organic Brown Rice', price: 179.00, originalPrice: 219.00, category: 'Pantry', image: '/images/products/rice.jpg', rating: 4.7, stock: 15, quantity: 15, isNew: false, isFeatured: false, isTrending: false, description: 'Nutritious unpolished brown basmati rice.' },
  { name: 'Fresh Orange Juice', price: 119.00, originalPrice: 149.00, category: 'Beverages', image: '/images/products/orange-juice.jpg', rating: 4.2, stock: 35, quantity: 35, isNew: true, isFeatured: false, isTrending: true, description: '100% pure cold-pressed orange juice with pulp.' },
  { name: 'Crunchy Potato Chips', price: 39.00, originalPrice: 49.00, category: 'Snacks', image: '/images/products/chips.jpg', rating: 4.0, stock: 60, quantity: 60, isNew: false, isFeatured: false, isTrending: false, description: 'Lightly salted, thin-sliced crispy potato chips.' },
  { name: 'Rolled Oats', price: 199.00, originalPrice: 249.00, category: 'Breakfast', image: '/images/products/oats.jpg', rating: 4.5, stock: 18, quantity: 18, isNew: false, isFeatured: false, isTrending: true, description: 'Premium whole grain rolled oats for a healthy breakfast.' },
  { name: 'Multivitamin Gummies', price: 599.00, originalPrice: 799.00, category: 'Health', image: '/images/products/gummies.jpg', rating: 4.9, stock: 10, quantity: 10, isNew: true, isFeatured: true, isTrending: true, description: 'Daily multivitamin health supplements for immunity and energy.' }
];

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout for Atlas connection
    });

    console.log("✅ MongoDB Connected Successfully to Atlas");
    console.log("Connected Database:", mongoose.connection.name);

    // Auto seed if database is empty
    await checkAndSeedDatabase();

  } catch (error) {
    console.warn("⚠️ MongoDB Atlas Connection Failed:", error.message);
    console.log("Starting Local MongoDB Memory Server...");
    try {
      mongoServer = await MongoMemoryServer.create({ binary: { version: '4.4.29' } });
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("✅ Local MongoDB Memory Server Started and Connected Successfully at:", mongoUri);

      // Auto seed memory database since it starts fresh
      await checkAndSeedDatabase();
    } catch (err) {
      console.error("❌ Local MongoDB Memory Server Failed to Start:", err.message);
      process.exit(1);
    }
  }
};

const checkAndSeedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("🗄️ Database is empty. Seeding products...");
      await Product.insertMany(seedProducts);
      console.log("✅ Seeding completed! Loaded", seedProducts.length, "products.");
    } else {
      console.log("ℹ️ Database already has", count, "products. Skipping auto-seed.");
    }
  } catch (err) {
    console.error("❌ Error checking/seeding database:", err.message);
  }
};

module.exports = connectDB;