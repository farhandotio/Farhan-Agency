// controllers/auth.controllers.js
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import uploadFile from "../services/storage.service.js";
import fs from "fs/promises";
import path from "path";

// -------------------- AUTH HELPERS -------------------- //

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

const sendTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none", // MUST be string
    secure: true, // render deploy requires this when sameSite none
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
};

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

const getFileDataFromReqFile = async (file) => {
  if (!file) return null;

  // memoryStorage
  if (file.buffer) {
    const base64 = file.buffer.toString("base64");
    return {
      dataUrl: `data:${file.mimetype};base64,${base64}`,
      filename: file.originalname || `upload-${Date.now()}`,
    };
  }

  // diskStorage
  if (file.path) {
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

// -------------------- REGISTER -------------------- //

export async function register(req, res) {
  try {
    // Fields
    const email = req.body?.email;
    const password = req.body?.password;
    const company = req.body?.company || null; // optional company field

    const { firstName, lastName } = extractFullname(req.body);

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check existing user
    const isUserExist = await userModel.findOne({ email: normalizedEmail });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Profile Picture
    let pictureUrl = null;

    if (req.file) {
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
    }

    // body file or URL
    if (!pictureUrl && (req.body.file || req.body.picture)) {
      const fileFromBody = req.body.file || req.body.picture;

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
          pictureUrl = fileFromBody; // direct URL
        }
      } else if (typeof fileFromBody === "object" && fileFromBody.url) {
        pictureUrl = fileFromBody.url;
      }
    }

    // Create user
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email: normalizedEmail,
      password: hash,
      picture: pictureUrl,
      fullname: { firstName, lastName },
      company, // optional field added here
    });

    // Token
    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        picture: user.picture,
        company: user.company,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- LOGIN -------------------- //

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
        company: user.company,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- PROFILE -------------------- //

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
        company: user.company,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- ALL USERS -------------------- //

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- LOGOUT -------------------- //

export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// -------------------- UPDATE PROFILE -------------------- //
export async function updateProfile(req, res) {
  try {
    const user = req.user; // VerifyToken middleware sets this
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = {};

    // Fullname
    const firstName =
      req.body["fullname.firstName"] ||
      req.body.fullname?.firstName ||
      req.body.firstName;
    const lastName =
      req.body["fullname.lastName"] ||
      req.body.fullname?.lastName ||
      req.body.lastName;

    if (firstName || lastName) {
      updates.fullname = {
        firstName: firstName || user.fullname.firstName,
        lastName: lastName || user.fullname.lastName,
      };
    }

    // Company (optional)
    if (req.body.company !== undefined) {
      updates.company = req.body.company || null;
    }

    // Picture (optional, multer)
    if (req.file) {
      try {
        const fileData = await getFileDataFromReqFile(req.file);
        if (fileData?.dataUrl) {
          const uploadResp = await uploadFile(
            fileData.dataUrl,
            fileData.filename
          );
          updates.picture =
            uploadResp?.url ||
            uploadResp?.secure_url ||
            uploadResp?.filePath ||
            null;
        }
      } catch (err) {
        console.error("Profile image upload failed:", err);
      }
    }

    // Update user
    const updatedUser = await userModel
      .findByIdAndUpdate(user._id, updates, {
        new: true,
      })
      .select("-password");

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
