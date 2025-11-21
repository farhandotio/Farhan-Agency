import express from "express";
import * as authController from "../controllers/auth.controllers.js";
import * as validationRules from "../middlewares/validation.middlewares.js";
import multer from "multer";
import { VerifyToken, isAdmin } from "../middlewares/auth.middlewares.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// -------------------- AUTH ROUTES -------------------- //

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

router.get("/profile", VerifyToken, authController.getProfile);

router.get("/all-users", VerifyToken, isAdmin, authController.getAllUsers);

router.post("/logout", VerifyToken, authController.logout);

router.put(
  "/profile",
  VerifyToken,
  upload.single("picture"),
  authController.updateProfile
);

export default router;
