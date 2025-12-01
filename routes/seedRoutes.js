import express from "express";
import seedProducts from "../seedProducts.js";

const router = express.Router();

// WARNING: Remove after running once
router.get("/", async (req, res) => {
  try {
    await seedProducts();
    res.status(200).json({ message: "Products seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
