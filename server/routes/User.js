import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//============Login User===========//

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token, message: "Login successful" });
    }
        catch (error) {
            console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
        }
});

//============Register User===========//
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong Password with at least 8 characters",
      });
    }
    // Hash the password//
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    res.json({ success: true, token, message: "User registered successfully" });
    toast.success("Registered successfully! Welcome to Flave.");
  } catch (error) {
    toast.error("Registration failed. Please try again later.");
    return res.status(500).json({ message: error.message });
  }
});
export default router;
