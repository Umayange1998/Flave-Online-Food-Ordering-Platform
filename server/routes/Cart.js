import userModel from "../models/userModel.js";
import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

//add to cart//
router.post("/", authMiddleware, async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: cartData });
    res.status(200).json({ message: "Food added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

//remove from cart//
router.delete("/", authMiddleware, async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      await userModel.findByIdAndUpdate(req.body.userId, {
        cartData: cartData,
      });
      res.status(200).json({ message: "Food removed from cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
});

//get cart items//
router.post("/get", authMiddleware, async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    res.status(200).json({ cartData: cartData });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

export default router;
