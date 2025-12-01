import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ---------------- PRODUCTS DATA ----------------
const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'A timeless white t-shirt perfect for everyday wear.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
  },
  
];

// ---------------- SEED API ROUTE ----------------
router.get("/", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);

    res.json({
      success: true,
      message: `${products.length} products seeded successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
