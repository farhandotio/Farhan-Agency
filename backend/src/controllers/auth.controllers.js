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
    // ===================
    // 1️⃣ Extract fields
    // ===================
    const email = req.body.email;
    const password = req.body.password;

    // Handle fullname from FormData
    let firstName =
      req.body["fullname.firstName"] || req.body.fullname?.firstName;
    let lastName = req.body["fullname.lastName"] || req.body.fullname?.lastName;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ===================
    // 2️⃣ Check existing user
    // ===================
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ===================
    // 3️⃣ Handle picture
    // ===================
    let pictureUrl = null;

    // multer uploaded file
    if (req.file && req.file.buffer) {
      try {
        const base64 = req.file.buffer.toString("base64");
        const fileStr = `data:${req.file.mimetype};base64,${base64}`;
        const uploadResp = await uploadFile(
          fileStr,
          req.file.originalname || `upload-${Date.now()}`
        );
        pictureUrl =
          uploadResp?.url ||
          uploadResp?.secure_url ||
          uploadResp?.filePath ||
          null;
      } catch (err) {
        console.error("Profile image upload failed (multer):", err);
      }
    }
    // JSON / URL from body
    else if (req.body.file || req.body.picture) {
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
            pictureUrl = fileFromBody;
          }
        } else if (typeof fileFromBody === "object" && fileFromBody.url) {
          pictureUrl = fileFromBody.url;
        }
      } catch (err) {
        console.error("Error processing fileFromBody:", err);
      }
    }

    // ===================
    // 4️⃣ Create user
    // ===================
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      password: hash,
      picture: pictureUrl,
      fullname: { firstName, lastName },
    });

    // ===================
    // 5️⃣ Send token & response
    // ===================
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
      return res.status(400).json({
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
    res.redirect("https://farhanagency.vercel.app/");
  } catch (err) {
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
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
