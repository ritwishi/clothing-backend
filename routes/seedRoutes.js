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
  {
    name: "Men's Olive Green Bomber Jacket",
    description: "Lightweight bomber jacket with ribbed cuffs and zipper closure.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1520975918318-3e88c8b2a5c7?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 35
  },
  {
    name: "Men's Slim Fit Black Jeans",
    description: "Premium stretchable slim-fit jeans for all-day comfort.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50
  },
  {
    name: "Men's Sky Blue Shirt",
    description: "Classic formal shirt crafted with soft cotton fabric.",
    price: 899,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40
  },
  {
    name: "Men's Checked Casual Shirt",
    description: "Trendy checked shirt suitable for casual outings.",
    price: 999,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 60
  },
  {
    name: "Men's Winter Puffer Jacket",
    description: "Warm and stylish puffer jacket for winter wear.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1611003224613-84e72a5fddbf?w=400",
    category: "Men",
    sizes: ["L", "XL", "XXL"],
    stock: 22
  },
  {
    name: "Men's Sports Training Shorts",
    description: "Breathable, lightweight shorts for gym and sports activities.",
    price: 499,
    image: "https://images.unsplash.com/photo-1517343982977-cf37684c8b52?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 70
  },
  {
    name: "Men's Charcoal Hoodie",
    description: "Soft fleece hoodie with front kangaroo pocket.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1584367369853-8b966db26f86?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 40
  },
  {
    name: "Men's Classic Polo T-Shirt",
    description: "Premium cotton polo shirt with embroidered logo.",
    price: 799,
    image: "https://images.unsplash.com/photo-1580906855280-35977c5a7ef7?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 55
  },
  {
    name: "Men's Navy Blue Track Pants",
    description: "Comfortable and stretchable track pants for daily wear.",
    price: 899,
    image: "https://images.unsplash.com/photo-1534215754734-18e56b801e3a?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 65
  },
  {
    name: "Men's Premium Leather Wallet",
    description: "Genuine leather wallet with multiple compartments.",
    price: 599,
    image: "https://images.unsplash.com/photo-1612810806563-d3c9a503d1b4?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 100
  },
  {
    name: "Women's Lavender Summer Dress",
    description: "Lightweight floral dress perfect for summer outings.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1520975867597-1f0c6e3c4cc7?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 30
  },
  {
    name: "Women's Black Crop Hoodie",
    description: "Trendy cropped hoodie with soft fleece lining.",
    price: 999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 45
  },
  {
    name: "Women's Beige Trench Coat",
    description: "Classic trench coat for an elegant winter look.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    category: "Women",
    sizes: ["M", "L", "XL"],
    stock: 18
  },
  {
    name: "Women's High-Waist Blue Jeans",
    description: "Premium high-waist jeans with stretchable fabric.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 40
  },
  {
    name: "Women's White Cotton Kurti",
    description: "Elegant embroidered kurti perfect for daily wear.",
    price: 899,
    image: "https://images.unsplash.com/photo-1608069951006-cbe3c0458fd0?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 50
  },
  {
    name: "Women's Sports Leggings",
    description: "Stretchable, moisture-wicking leggings for gym training.",
    price: 799,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 60
  },
  {
    name: "Women's Red Party Gown",
    description: "Floor-length gown with elegant satin finish.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1551022372-9837c2e6f1ca?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25
  },
  {
    name: "Women's Pink Knit Sweater",
    description: "Warm knitted sweater with soft-touch fabric.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35
  },
  {
    name: "Women's Leather Shoulder Bag",
    description: "Elegant everyday bag with premium faux leather finish.",
    price: 1399,
    image: "https://images.unsplash.com/photo-1618354691417-172c2f3daee1?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 70
  },
  {
    name: "Women's Sandals (Beige)",
    description: "Comfortable daily-wear sandals with cushioned sole.",
    price: 699,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223ae8b?w=400",
    category: "Women",
    sizes: ["36", "37", "38", "39", "40"],
    stock: 48
  },
  {
    name: "Kids Yellow Rain Jacket",
    description: "Waterproof rain jacket with hood for all-weather protection.",
    price: 899,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 40
  },
  {
    name: "Kids Cartoon Print T-Shirt",
    description: "Soft cotton t-shirt with fun cartoon graphics.",
    price: 399,
    image: "https://images.unsplash.com/photo-1523475496153-3d6cc3000d45?w=400",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 60
  },
  {
    name: "Kids Denim Shorts",
    description: "Comfortable denim shorts for everyday play.",
    price: 499,
    image: "https://images.unsplash.com/photo-1526178619323-52c6d3f4a5b8?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 50
  },
  {
    name: "Kids Winter Woolen Cap",
    description: "Warm & cozy cap for cold winter days.",
    price: 299,
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400",
    category: "Kids",
    sizes: ["Free Size"],
    stock: 80
  },
  {
    name: "Kids Pink Party Dress",
    description: "Beautiful frill dress for parties and functions.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1603190287605-e6f4c1a25399?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 25
  },
  {
    name: "Kids Colourful Sneakers",
    description: "Vibrant sneakers with comfort cushioning.",
    price: 899,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    category: "Kids",
    sizes: ["28", "29", "30", "31", "32"],
    stock: 45
  },
  {
    name: "Kids Blue Hoodie",
    description: "Soft fleece hoodie for school and outdoor play.",
    price: 799,
    image: "https://images.unsplash.com/photo-1555489426-3c6870b4aacb?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 35
  },
  {
    name: "Kids Cotton Pajama Set",
    description: "Comfortable pajama set with breathable cotton fabric.",
    price: 699,
    image: "https://images.unsplash.com/photo-1527047019234-7b118f083d5d?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 55
  },
  {
    name: "Kids Colorful Sweatshirt",
    description: "Warm sweatshirt with printed design.",
    price: 699,
    image: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 50
  },
  {
    name: "Kids School Shoes (Black)",
    description: "Durable and comfortable shoes for school uniform.",
    price: 799,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    category: "Kids",
    sizes: ["28", "29", "30", "31", "32"],
    stock: 40
  },
  {
    name: "Men's Black Running Shoes",
    description: "Lightweight and breathable shoes designed for daily running.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c4a0d49?w=400",
    category: "Men",
    sizes: ["7", "8", "9", "10", "11"],
    stock: 45
  },
  {
    name: "Women's White Chunky Sneakers",
    description: "Trendy chunky shoes with cushioned sole for all-day comfort.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400",
    category: "Women",
    sizes: ["5", "6", "7", "8"],
    stock: 38
  },
  {
    name: "Unisex Grey High-Top Sneakers",
    description: "Stylish high-top sneakers suitable for men and women.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Unisex",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 55
  },
  {
    name: "Men's Brown Leather Loafers",
    description: "Premium leather loafers for formal and semi-formal occasions.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1585916140505-0bff11e9bdc3?w=400",
    category: "Men",
    sizes: ["8", "9", "10", "11"],
    stock: 28
  },
  {
    name: "Women's Pink Sports Shoes",
    description: "Breathable mesh shoes designed for workouts and running.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1580927752452-89d86f8f8c35?w=400",
    category: "Women",
    sizes: ["5", "6", "7", "8"],
    stock: 40
  },
  {
    name: "Kids Blue Velcro Sneakers",
    description: "Easy-to-wear sneakers with soft cushioning for kids.",
    price: 899,
    image: "https://images.unsplash.com/photo-1618221362529-e3a8c77f5e52?w=400",
    category: "Kids",
    sizes: ["28", "29", "30", "31", "32"],
    stock: 50
  },
  {
    name: "Unisex White Canvas Shoes",
    description: "Classic canvas shoes for everyday casual wear.",
    price: 999,
    image: "https://images.unsplash.com/photo-1589366434638-62a29c2e7b2c?w=400",
    category: "Unisex",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 70
  },
  {
    name: "Men's Outdoor Trekking Boots",
    description: "Durable trekking boots with anti-slip sole.",
    price: 2799,
    image: "https://images.unsplash.com/photo-1596450514197-1f81b72bca0e?w=400",
    category: "Men",
    sizes: ["8", "9", "10", "11"],
    stock: 20
  },
  {
    name: "Women's Nude Ballet Flats",
    description: "Elegant ballet flats perfect for office wear and outings.",
    price: 899,
    image: "https://images.unsplash.com/photo-1582582494700-860b058ba19d?w=400",
    category: "Women",
    sizes: ["5", "6", "7", "8"],
    stock: 48
  },
  {
    name: "Kids Red Sports Shoes",
    description: "Durable and stylish sports shoes for energetic kids.",
    price: 999,
    image: "https://images.unsplash.com/photo-1596464716127-f89ddf0c2b89?w=400",
    category: "Kids",
    sizes: ["27", "28", "29", "30", "31"],
    stock: 42
  },
  {
    name: "Unisex Classic Black Cap",
    description: "Adjustable cotton cap perfect for sun protection and casual wear.",
    price: 399,
    image: "https://images.unsplash.com/photo-1599447421347-bc5688baad02?w=400",
    category: "Unisex",
    sizes: ["Free Size"],
    stock: 80
  },
  {
    name: "Leather Brown Belt",
    description: "Premium leather belt with metallic buckle.",
    price: 699,
    image: "https://images.unsplash.com/photo-1600185365987-dc3c7d06c5b3?w=400",
    category: "Accessories",
    sizes: ["M", "L", "XL"],
    stock: 60
  },
  {
    name: "Unisex Black Sunglasses",
    description: "UV-protected stylish sunglasses suitable for men and women.",
    price: 499,
    image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=400",
    category: "Unisex",
    sizes: ["One Size"],
    stock: 85
  },
  {
    name: "Women's Rose Gold Watch",
    description: "Elegant wristwatch with stainless steel strap and minimal design.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 40
  },
  {
    name: "Men's Stainless Steel Watch",
    description: "Classic analog watch with premium metal strap.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 35
  },
  {
    name: "Unisex Black Backpack",
    description: "Durable and lightweight backpack for school, travel, or office.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223ae8b?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 65
  },
  {
    name: "Women's Tote Handbag",
    description: "Spacious tote bag with premium leather finish.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1593032465172-353c7fbc3f14?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 50
  },
  {
    name: "Unisex Wristbands (Pack of 3)",
    description: "Soft and stretchable wristbands for sports and daily use.",
    price: 299,
    image: "https://images.unsplash.com/photo-1548414705-1f8a5d2f66ad?w=400",
    category: "Unisex",
    sizes: ["Free Size"],
    stock: 100
  },
  {
    name: "Men's Travel Duffle Bag",
    description: "Stylish duffle bag ideal for travel and gym use.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb4dc613f7?w=400",
    category: "Accessories",
    sizes: ["One Size"],
    stock: 40
  },
  {
    name: "Unisex Winter Wool Scarf",
    description: "Warm woolen scarf for winter protection.",
    price: 599,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
    category: "Unisex",
    sizes: ["Free Size"],
    stock: 70
  }
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
