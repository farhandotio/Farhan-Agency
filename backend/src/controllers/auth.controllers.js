// controllers/auth.controllers.js
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import uploadFile from "../services/storage.service.js";
import fs from "fs/promises";
import path from "path";

const isProd = config.NODE_ENV === "production";

// -------------------- AUTH HELPERS -------------------- //

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
}; 

// safe helper to get nested fullname fields from FormData or JSON body
const extractFullname = (body) => {
  const firstName =
    body["fullname.firstName"] ||
    body.fullname?.firstName ||
    body.firstName ||
    body.first_name ||
    null;
  const lastName =
    body["fullname.lastName"] ||
    body.fullname?.lastName ||
    body.lastName ||
    body.last_name ||
    null;
  return { firstName, lastName };
};

// Helper: try to handle different multer setups (memory or disk)
const getFileDataFromReqFile = async (file) => {
  if (!file) return null;

  // memoryStorage: buffer present
  if (file.buffer) {
    const base64 = file.buffer.toString("base64");
    return {
      dataUrl: `data:${file.mimetype};base64,${base64}`,
      filename: file.originalname || `upload-${Date.now()}`,
    };
  }

  // diskStorage: path available
  if (file.path) {
    // read file and convert to base64 data url
    try {
      const buf = await fs.readFile(file.path);
      const ext = path.extname(file.originalname || file.filename || "");
      const mime =
        file.mimetype || (ext ? `image/${ext.replace(".", "")}` : "");
      const base64 = buf.toString("base64");
      return {
        dataUrl: mime
          ? `data:${mime};base64,${base64}`
          : `data:;base64,${base64}`,
        filename: file.originalname || `upload-${Date.now()}`,
      };
    } catch (err) {
      console.error("Error reading uploaded file from disk:", err);
      return null;
    }
  }

  return null;
};

// -------------------- CONTROLLERS -------------------- //

export async function register(req, res) {
  try {
    // 1️⃣ Extract fields
    const email = req.body?.email;
    const password = req.body?.password;
    const { firstName, lastName } = extractFullname(req.body);

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // simple email normalization
    const normalizedEmail = String(email).trim().toLowerCase();

    // 2️⃣ Check existing user
    const isUserExist = await userModel.findOne({ email: normalizedEmail });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Handle picture
    let pictureUrl = null;

    // prioritize multer file if present
    if (req.file) {
      try {
        const fileData = await getFileDataFromReqFile(req.file);
        if (fileData?.dataUrl) {
          const uploadResp = await uploadFile(
            fileData.dataUrl,
            fileData.filename
          );
          pictureUrl =
            uploadResp?.url ||
            uploadResp?.secure_url ||
            uploadResp?.filePath ||
            null;
        }
      } catch (err) {
        console.error("Profile image upload failed (multer):", err);
        // continue without failing registration
      }
    } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // if multiple files sent, take first
      try {
        const fileData = await getFileDataFromReqFile(req.files[0]);
        if (fileData?.dataUrl) {
          const uploadResp = await uploadFile(
            fileData.dataUrl,
            fileData.filename
          );
          pictureUrl =
            uploadResp?.url ||
            uploadResp?.secure_url ||
            uploadResp?.filePath ||
            null;
        }
      } catch (err) {
        console.error("Profile image upload failed (multer multiple):", err);
      }
    }
    // JSON / URL from body (string or object with url)
    if (!pictureUrl && (req.body.file || req.body.picture)) {
      const fileFromBody = req.body.file || req.body.picture;
      try {
        if (typeof fileFromBody === "string") {
          if (
            fileFromBody.startsWith("data:") &&
            fileFromBody.includes("base64,")
          ) {
            const uploadResp = await uploadFile(
              fileFromBody,
              `upload-${Date.now()}`
            );
            pictureUrl =
              uploadResp?.url ||
              uploadResp?.secure_url ||
              uploadResp?.filePath ||
              null;
          } else {
            // assume it's a URL
            pictureUrl = fileFromBody;
          }
        } else if (typeof fileFromBody === "object" && fileFromBody.url) {
          pictureUrl = fileFromBody.url;
        }
      } catch (err) {
        console.error("Error processing fileFromBody:", err);
      }
    }

    // 4️⃣ Create user
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email: normalizedEmail,
      password: hash,
      picture: pictureUrl,
      fullname: { firstName, lastName },
    });

    // 5️⃣ Send token & response
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
    const { email, password } = req.body || {};

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // If user was created via Google and has no password
    if (!user.password) {
      return res.status(400).json({
        message: "Account registered via Google. Please login with Google.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

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
    if (!googleUser) {
      console.error("googleOAuthCallback: no req.user");
      return res.redirect("https://farhanagency.vercel.app/login?error=oauth");
    }

    const email = googleUser.emails?.[0]?.value?.toLowerCase?.() || null;
    const googleId = googleUser.id || null;

    let user = null;
    if (googleId) {
      user = await userModel.findOne({
        $or: [{ googleId }, { email }],
      });
    } else if (email) {
      user = await userModel.findOne({ email });
    }

    if (!user) {
      const firstName =
        googleUser.name?.givenName ||
        googleUser.displayName?.split(" ")?.[0] ||
        "User";
      const lastName =
        googleUser.name?.familyName ||
        googleUser.displayName?.split(" ")?.slice(1).join(" ") ||
        "";

      user = await userModel.create({
        googleId,
        email,
        picture: googleUser.photos?.[0]?.value || null,
        fullname: { firstName, lastName },
      });
    }

    const token = generateToken(user);
    sendTokenCookie(res, token);

    // redirect to frontend
    res.redirect("https://farhanagency.vercel.app/");
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    res.redirect("https://farhanagency.vercel.app/login?error=oauth");
  }
}

// -------------------- PROTECTED ROUTES -------------------- //

export async function getProfile(req, res) {
  try {
    const user = req.user;
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
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
