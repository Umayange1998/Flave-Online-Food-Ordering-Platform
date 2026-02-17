import express from "express";
const router = express.Router();
import Food from "../models/foodModel.js";
import upload from "../middleware/upload.js";
import fs from "fs";
import path from "path";

//===========GET ALL FOOD===========//
router.get("/", async (req, res) => {
  try {
    const foodList = await Food.find();
    res.status(200).json(foodList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//===========CREATE FOOD===========//
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newFood = new Food({
      name,
      description,
      price,
      category,
      image: req.file.filename,
    });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//===========UPDATE FOOD===========//
router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//===========DELETE FOOD===========//
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim(); 
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const imagePath = path.join("uploads", food.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Food.findByIdAndDelete(id);

    res.status(200).json({ message: "Food and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
