import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🔑 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username: username || name || "User",
      email,
      password,
    });

    await user.save();

    const token = generateToken(user);

    const safeUser = await User.findById(user._id).select("-password");

    res.json({ user: safeUser, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    const safeUser = await User.findById(user._id).select("-password");

    res.json({ user: safeUser, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADMIN REGISTER
router.post("/admin/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const admin = new User({
      username: username || "Admin",
      email,
      password,
      role: "admin",
    });

    await admin.save();

    const token = generateToken(admin);

    const safeAdmin = await User.findById(admin._id).select("-password");

    res.json({ user: safeAdmin, token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;