import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// --------------------- PRODUCTS DATA ---------------------
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
  {
    name: 'Black Hoodie',
    description: 'Comfortable and warm black hoodie for cold weather.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1556821552-5f63b1c6fbf5?w=400',
    category: 'Men',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 35,
  },
  {
    name: 'Blue Denim Jeans',
    description: 'Classic blue denim jeans with perfect fit.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
  },
  {
    name: "Women's Red Dress",
    description: 'Elegant red dress perfect for occasions.',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 25,
  },
  {
    name: 'White Sneakers',
    description: 'Stylish white sneakers for casual wear.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1525966222134-fcebfc881cc0?w=400',
    category: 'Unisex',
    sizes: ['S', 'M', 'L'],
    stock: 60,
  },
  {
    name: 'Gray Joggers',
    description: 'Comfortable gray joggers for athletic wear.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1506629082632-20aa39d6d435?w=400',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 40,
  },
  {
    name: 'Pink Sports Top',
    description: 'Breathable pink sports top for active women.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 30,
  },
  {
    name: 'Kids Blue Jacket',
    description: 'Warm and cozy blue jacket for kids.',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1611689534306-591cecf1133f?w=400',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 28,
  },
  {
    name: 'Navy Cargo Shorts',
    description: 'Practical navy cargo shorts with multiple pockets.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 35,
  },
  {
    name: 'Striped Polo Shirt',
    description: 'Classic striped polo shirt for a polished look.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1577623645672-2ce9c71d5bbd?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42,
  },
  {
    name: "Women's Leather Jacket",
    description: 'Stylish black leather jacket for women.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 15,
  },
  {
    name: 'Kids Colorful Sweater',
    description: 'Fun and colorful sweater for kids.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1567026556061-31659f40a31d?w=400',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 32,
  },
  {
    name: 'Unisex Beanie',
    description: 'Warm and comfortable beanie for winter.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    category: 'Unisex',
    sizes: ['M', 'L'],
    stock: 100,
  },
  {
    name: "Women's Silk Blouse",
    description: 'Elegant silk blouse for professional settings.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 20,
  },
  {
    name: "Men's Formal Trousers",
    description: 'Professional formal trousers for office wear.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1602807860487-79bb0a6b19db?w=400',
    category: 'Men',
    sizes: ['M', 'L', 'XL'],
    stock: 25,
  },
  {
    name: 'Kids Denim Jacket',
    description: 'Cool denim jacket for kids.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1520409186805-2e37b90b5b69?w=400',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 24,
  },
  {
    name: 'Summer Floral Dress',
    description: 'Light and breathable floral dress for summer.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1595777712802-4eb2c6a3d37f?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
  },
  {
    name: 'Athletic Compression Shirt',
    description: 'High-performance compression shirt for athletes.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
  },
  {
    name: 'Cozy Flannel Shirt',
    description: 'Warm and comfortable flannel shirt.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1589902388103-242e3a41f580?w=400',
    category: 'Men',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 36,
  },
  {
    name: "Women's Crop Top",
    description: 'Trendy crop top for casual outings.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1623619558933-c8e1fd79dd6c?w=400',
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 50,
  },
  {
    name: 'Kids Graphic T-Shirt',
    description: 'Fun graphic t-shirt for kids.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1557622645-fc8f89f8e01f?w=400',
    category: 'Kids',
    sizes: ['S', 'M', 'L'],
    stock: 55,
  },
  {
    name: 'Unisex Oversized Sweatshirt',
    description: 'Comfortable oversized sweatshirt for everyone.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1546925773-c4a3dcdaa02f?w=400',
    category: 'Unisex',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 48,
  },
];

// --------------------- SEED FUNCTION ---------------------
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB Atlas");

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`✓ ${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
