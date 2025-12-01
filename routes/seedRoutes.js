import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ---------------- PRODUCTS DATA (50 items) ----------------
const products = [
  // 1
  {
    name: "Classic White T-Shirt",
    description: "A timeless white t-shirt perfect for everyday wear.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  // 2
  {
    name: "Black Hoodie",
    description: "Comfortable and warm black hoodie for cold weather.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1556821552-5f63b1c6fbf5?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 35,
  },
  // 3
  {
    name: "Blue Denim Jeans",
    description: "Classic blue denim jeans with perfect fit.",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
  },
  // 4
  {
    name: "Women's Red Dress",
    description: "Elegant red dress perfect for occasions.",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 25,
  },
  // 5
  {
    name: "White Sneakers",
    description: "Stylish white sneakers for casual wear.",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcebfc881cc0?w=400",
    category: "Unisex",
    sizes: ["S", "M", "L"],
    stock: 60,
  },
  // 6
  {
    name: "Gray Joggers",
    description: "Comfortable gray joggers for athletic wear.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1506629082632-20aa39d6d435?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },
  // 7
  {
    name: "Pink Sports Top",
    description: "Breathable pink sports top for active women.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 30,
  },
  // 8
  {
    name: "Kids Blue Jacket",
    description: "Warm and cozy blue jacket for kids.",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1611689534306-591cecf1133f?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 28,
  },
  // 9
  {
    name: "Navy Cargo Shorts",
    description: "Practical navy cargo shorts with multiple pockets.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35,
  },
  // 10
  {
    name: "Striped Polo Shirt",
    description: "Classic striped polo shirt for a polished look.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1577623645672-2ce9c71d5bbd?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 42,
  },
  // 11
  {
    name: "Women's Leather Jacket",
    description: "Stylish black leather jacket for women.",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 15,
  },
  // 12
  {
    name: "Kids Colorful Sweater",
    description: "Fun and colorful sweater for kids.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1567026556061-31659f40a31d?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 32,
  },
  // 13
  {
    name: "Unisex Beanie",
    description: "Warm and comfortable beanie for winter.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    category: "Unisex",
    sizes: ["M", "L"],
    stock: 100,
  },
  // 14
  {
    name: "Women's Silk Blouse",
    description: "Elegant silk blouse for professional settings.",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 20,
  },
  // 15
  {
    name: "Men's Formal Trousers",
    description: "Professional formal trousers for office wear.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1602807860487-79bb0a6b19db?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 25,
  },
  // 16
  {
    name: "Kids Denim Jacket",
    description: "Cool denim jacket for kids.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1520409186805-2e37b90b5b69?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 24,
  },
  // 17
  {
    name: "Summer Floral Dress",
    description: "Light and breathable floral dress for summer.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1595777712802-4eb2c6a3d37f?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 22,
  },
  // 18
  {
    name: "Athletic Compression Shirt",
    description: "High-performance compression shirt for athletes.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  // 19
  {
    name: "Cozy Flannel Shirt",
    description: "Warm and comfortable flannel shirt.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1589902388103-242e3a41f580?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 36,
  },
  // 20
  {
    name: "Women's Crop Top",
    description: "Trendy crop top for casual outings.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1623619558933-c8e1fd79dd6c?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 50,
  },
  // 21
  {
    name: "Kids Graphic T-Shirt",
    description: "Fun graphic t-shirt for kids.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1557622645-fc8f89f8e01f?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 55,
  },
  // 22
  {
    name: "Unisex Oversized Sweatshirt",
    description: "Comfortable oversized sweatshirt for everyone.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1546925773-c4a3dcdaa02f?w=400",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 48,
  },
  // 23
  {
    name: "Men's Olive Green Bomber Jacket",
    description:
      "Lightweight bomber jacket with ribbed cuffs and zipper closure.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1520975918318-3e88c8b2a5c7?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 35,
  },
  // 24
  {
    name: "Men's Slim Fit Black Jeans",
    description:
      "Premium stretchable slim-fit jeans for all-day comfort.",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  // 25
  {
    name: "Men's Sky Blue Shirt",
    description: "Classic formal shirt crafted with soft cotton fabric.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },
  // 26
  {
    name: "Men's Checked Casual Shirt",
    description: "Trendy checked shirt suitable for casual outings.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 60,
  },
  // 27
  {
    name: "Men's Winter Puffer Jacket",
    description: "Warm and stylish puffer jacket for winter wear.",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1611003224613-84e72a5fddbf?w=400",
    category: "Men",
    sizes: ["L", "XL", "XXL"],
    stock: 22,
  },
  // 28
  {
    name: "Men's Sports Training Shorts",
    description:
      "Breathable, lightweight shorts for gym and sports activities.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1517343982977-cf37684c8b52?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 70,
  },
  // 29
  {
    name: "Men's Charcoal Hoodie",
    description: "Soft fleece hoodie with front kangaroo pocket.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1584367369853-8b966db26f86?w=400",
    category: "Men",
    sizes: ["M", "L", "XL", "XXL"],
    stock: 40,
  },
  // 30
  {
    name: "Men's Classic Polo T-Shirt",
    description: "Premium cotton polo shirt with embroidered logo.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1580906855280-35977c5a7ef7?w=400",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 55,
  },
  // 31
  {
    name: "Men's Navy Blue Track Pants",
    description: "Comfortable and stretchable track pants for daily wear.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1534215754734-18e56b801e3a?w=400",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 65,
  },
  // 32
  
  {
    name: "Women's Lavender Summer Dress",
    description: "Lightweight floral dress perfect for summer outings.",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1520975867597-1f0c6e3c4cc7?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 30,
  },
  // 34
  {
    name: "Women's Black Crop Hoodie",
    description: "Trendy cropped hoodie with soft fleece lining.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 45,
  },
  // 35
  {
    name: "Women's Beige Trench Coat",
    description: "Classic trench coat for an elegant winter look.",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    category: "Women",
    sizes: ["M", "L", "XL"],
    stock: 18,
  },
  // 36
  {
    name: "Women's High-Waist Blue Jeans",
    description:
      "Premium high-waist jeans with stretchable fabric.",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  // 37
  {
    name: "Women's White Cotton Kurti",
    description: "Elegant embroidered kurti perfect for daily wear.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1608069951006-cbe3c0458fd0?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  // 38
  {
    name: "Women's Sports Leggings",
    description: "Stretchable, moisture-wicking leggings for gym training.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    stock: 60,
  },
  // 39
  {
    name: "Women's Red Party Gown",
    description: "Floor-length gown with elegant satin finish.",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1551022372-9837c2e6f1ca?w=400",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  // 40
  {
    name: "Women's Pink Knit Sweater",
    description: "Warm knitted sweater with soft-touch fabric.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
  },
  // 41
  {
    name: "Kids Yellow Rain Jacket",
    description: "Waterproof rain jacket with hood for all-weather protection.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  // 42
  {
    name: "Kids Cartoon Print T-Shirt",
    description: "Soft cotton t-shirt with fun cartoon graphics.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1523475496153-3d6cc3000d45?w=400",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 60,
  },
  // 43
  {
    name: "Kids Denim Shorts",
    description: "Comfortable denim shorts for everyday play.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1526178619323-52c6d3f4a5b8?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  // 44
  {
    name: "Kids Pink Party Dress",
    description: "Beautiful frill dress for parties and functions.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1603190287605-e6f4c1a25399?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  // 45
  {
    name: "Kids Blue Hoodie",
    description: "Soft fleece hoodie for school and outdoor play.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1555489426-3c6870b4aacb?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  // 46
  {
    name: "Kids Cotton Pajama Set",
    description: "Comfortable pajama set with breathable cotton fabric.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1527047019234-7b118f083d5d?w=400",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 55,
  },
  // 47
  {
    name: "Kids Colorful Sweatshirt",
    description: "Warm sweatshirt with printed design.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400",
    category: "Kids",
    sizes: ["XS", "S", "M", "L"],
    stock: 50,
  },
  // 48
  {
    name: "Leather Brown Belt",
    description: "Premium leather belt with metallic buckle.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1600185365987-dc3c7d06c5b3?w=400",
    category: "Accessories",
    sizes: ["M", "L", "XL"],
    stock: 60,
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
    console.error("Seed error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
