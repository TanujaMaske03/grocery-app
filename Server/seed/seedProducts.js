const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "Apple",
    category: "Fruits",
    price: 120,
    quantity: 50,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },

  {
    name: "Banana",
    category: "Fruits",
    price: 60,
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
  },

  {
    name: "Orange",
    category: "Fruits",
    price: 90,
    quantity: 80,
    image:
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9",
  },

  {
    name: "Tomato",
    category: "Vegetables",
    price: 40,
    quantity: 120,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  },

  {
    name: "Potato",
    category: "Vegetables",
    price: 35,
    quantity: 150,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
  },

  {
    name: "Onion",
    category: "Vegetables",
    price: 45,
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510",
  },

  {
    name: "Carrot",
    category: "Vegetables",
    price: 55,
    quantity: 80,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979",
  },

  {
    name: "Milk",
    category: "Dairy",
    price: 65,
    quantity: 200,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  },

  {
    name: "Bread",
    category: "Bakery",
    price: 40,
    quantity: 90,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },

  {
    name: "Eggs",
    category: "Dairy",
    price: 90,
    quantity: 150,
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
  },

  {
    name: "Rice",
    category: "Grains",
    price: 70,
    quantity: 250,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },

  {
    name: "Sugar",
    category: "Grocery",
    price: 50,
    quantity: 180,
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
  },

  {
    name: "Salt",
    category: "Grocery",
    price: 25,
    quantity: 220,
    image:
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442f",
  },

  {
    name: "Sunflower Oil",
    category: "Oil",
    price: 180,
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
  },

  {
    name: "Biscuits",
    category: "Snacks",
    price: 30,
    quantity: 150,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
  },

  {
    name: "Spinach",
    category: "Vegetables",
    price: 35,
    quantity: 70,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

    await Product.deleteMany();

    console.log("Old Products Deleted");

    await Product.insertMany(products);

    console.log("Products Inserted Successfully");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

seedDatabase();