const mongoose = require('mongoose');
const Product = require('./models/Product');
const seedProducts = require('./data/products');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log("Connecting to database for seeding...");
    const { MongoMemoryServer } = require('mongodb-memory-server');
    let connectionString = process.env.MONGO_URI;
    let localServer;

    try {
      if (!connectionString) {
        throw new Error('No MONGO_URI provided in environment');
      }
      await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 2000 });
      console.log('✅ Connected to Atlas for seeding.');
    } catch (e) {
      console.log('⚠️ Could not connect to Atlas. Starting local Memory Server for manual seed...');
      localServer = await MongoMemoryServer.create({ binary: { version: '4.4.29' } });
      connectionString = localServer.getUri();
      await mongoose.connect(connectionString);
      console.log('✅ Connected to Local Memory Server for manual seed:', connectionString);
    }

    await Product.deleteMany(); // clear old products
    await Product.insertMany(seedProducts);
    console.log(`✅ Products seeded successfully in seed script! Loaded ${seedProducts.length} products.`);

    if (localServer) {
      console.log("Seeded memory server. Keeping process alive for 5 seconds to complete tasks...");
      setTimeout(() => {
        process.exit(0);
      }, 5000);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();