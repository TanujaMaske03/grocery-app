const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Product = require("../models/Product");
const seedProducts = require("../data/products");

let mongoServer;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2500 // 2.5 seconds timeout for Atlas connection
    });

    console.log("✅ MongoDB Connected Successfully to Atlas");
    console.log("Connected Database:", mongoose.connection.name);

    // Auto seed or update database
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
    // Check if products need seeding or updating to full catalog
    if (count === 0 || count < seedProducts.length) {
      console.log(`🗄️ Database has ${count} products. Re-seeding with complete catalog of ${seedProducts.length} items...`);
      await Product.deleteMany({});
      await Product.insertMany(seedProducts);
      console.log("✅ Seeding completed! Loaded", seedProducts.length, "products across all categories.");
    } else {
      console.log("ℹ️ Database already has", count, "products.");
    }
  } catch (err) {
    console.error("❌ Error checking/seeding database:", err.message);
  }
};

module.exports = connectDB;