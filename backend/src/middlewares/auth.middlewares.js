import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export const VerifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token)
    return res
      .status(401)
      .json({ message: "No token provided. Unauthorized." });

  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel
      .findById(payload.id)
      .select("fullname email role");

    if (!user) return res.status(401).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized." });
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied. Admins only." });

  next();
};

export const isUser = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized." });
  if (req.user.role !== "user")
    return res.status(403).json({ message: "Access denied. Users only." });

  next();
};
