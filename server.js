import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// -------------------------
//  Connect to MongoDB
// -------------------------
connectDB();

// -------------------------
//  Trust Proxy (Required for Deployments)
// -------------------------
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); 
}

// -------------------------
//  CORS CONFIG (Correct Version)
// -------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

// Add production frontend URL if exists
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow server-to-server, tools
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------------------------
//  Body Parsers
// -------------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -------------------------
//  Cookies
// -------------------------
app.use(cookieParser());

// -------------------------
//  Routes
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// -------------------------
//  Health Check
// -------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// -------------------------
//  404 Handler
// -------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -------------------------
//  Error Handler
// -------------------------
app.use(errorHandler);

// -------------------------
//  Start Server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log("✓ Allowed Origins:", allowedOrigins);
});
