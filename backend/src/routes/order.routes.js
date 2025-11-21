import express from "express";
import multer from "multer";
import {
  VerifyToken,
  isAdmin,
  isUser,
} from "../middlewares/auth.middlewares.js";
import {
  createOrder,
  getUserOrders,
  deleteUserOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrderByAdmin,
} from "../controllers/order.controllers.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Accept multiple possible fields for attachments
const uploadFields = upload.fields([
  { name: "attachments", maxCount: 10 },
  { name: "attachments[]", maxCount: 10 },
  { name: "files", maxCount: 10 },
]);

// -------------------- ORDER ROUTES -------------------- //

// Create order (user only)
router.post(
  "/create",
  VerifyToken,
  isUser,
  (req, res, next) => {
    uploadFields(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message });
      next();
    });
  },
  createOrder
);

// Get all orders (admin only)
router.get("/all", VerifyToken, isAdmin, getAllOrders);

// Get orders of logged-in user
router.get("/my-orders", VerifyToken, isUser, getUserOrders);

// Delete user's own order
router.delete("/delete/:id", VerifyToken, isUser, deleteUserOrder);

// Update order status (admin only)
router.patch("/update/:id", VerifyToken, isAdmin, updateOrderStatus);

// Delete order by admin
router.delete("/admin/delete/:id", VerifyToken, isAdmin, deleteOrderByAdmin);

export default router;
