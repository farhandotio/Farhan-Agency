// controllers/auth.controllers.js
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import uploadFile from "../services/storage.service.js";

// -------------------- AUTH HELPERS -------------------- //

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

const sendTokenCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

// -------------------- CONTROLLERS -------------------- //

export async function register(req, res) {
  try {
    const {
      email,
      password,
      fullname: { firstName, lastName } = {},
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exists" });

    let pictureUrl = null;
    if (req.file) {
      try {
        const base64 = req.file.buffer.toString("base64");
        const fileStr = `data:${req.file.mimetype};base64,${base64}`;
        const uploadResp = await uploadFile(fileStr, req.file.originalname);
        pictureUrl = uploadResp.url || uploadResp.filePath || null;
      } catch (err) {
        console.error("Profile image upload failed:", err);
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hash,
      picture: pictureUrl,
      fullname: { firstName, lastName },
    });

    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // If user was created via Google and has no password
    if (!user.password) {
      return res
        .status(400)
        .json({
          message: "Account registered via Google. Please login with Google.",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function googleOAuthCallback(req, res) {
  try {
    const googleUser = req.user;

    let user = await userModel.findOne({
      $or: [{ googleId: googleUser.id }, { email: googleUser.emails[0].value }],
    });

    if (!user) {
      user = await userModel.create({
        googleId: googleUser.id,
        email: googleUser.emails[0].value,
        picture: googleUser.photos?.[0]?.value || null,
        fullname: {
          firstName: googleUser.name.givenName,
          lastName: googleUser.name.familyName,
        },
      });
    }

    const token = generateToken(user);
    sendTokenCookie(res, token);

    // redirect to frontend
    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    res.redirect("http://localhost:5173/login?error=oauth");
  }
}

// -------------------- PROTECTED ROUTES -------------------- //

export async function getProfile(req, res) {
  try {
    const user = req.user; // attached by VerifyToken
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
