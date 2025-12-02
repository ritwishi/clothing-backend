import jwt from "jsonwebtoken";

/**
 * protect - middleware to require authentication.
 * Ensures req.user is always { id: <userId> } when present.
 */
export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authorized to access this route" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize req.user to an object containing id
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * optional - middleware that optionally sets req.user when a valid cookie exists.
 * Does not block requests when token is absent/invalid.
 */
export const optional = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
    }
    next();
  } catch (error) {
    // Ignore token errors for optional
    next();
  }
};
