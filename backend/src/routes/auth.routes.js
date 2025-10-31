import express from "express";
import * as authController from "../controllers/auth.controllers.js";
import * as validationRules from "../middlewares/validation.middlewares.js";
import passport from "passport";
import multer from "multer";
import { VerifyToken, isAdmin, isUser } from "../middlewares/auth.middlewares.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// 🟢 Public Routes
router.post(
  "/register",
  upload.single("picture"),
  validationRules.registerValidationRules,
  authController.register
);

router.post(
  "/login",
  validationRules.loginValidationRules,
  authController.login
);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleOAuthCallback
);

// 🔒 Protected Routes
router.get("/profile", VerifyToken, isUser, authController.getProfile);

router.get("/all-users", VerifyToken, isAdmin, authController.getAllUsers);

router.post("/logout", VerifyToken, authController.logout);

export default router;
