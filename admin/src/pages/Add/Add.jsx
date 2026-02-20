import React, { useRef, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";

function Add() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading] = useState(false);

  const [errors, setErrors] = useState({});

  const FoodCategory = ["Pizza", "Burger", "Dessert", "Drinks"];

  const handleAddFood = async () => {
    console.log("BASE_URL:", BASE_URL);

    const newErrors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!category) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const response = await axios.post(`${BASE_URL}/food`, formData);

      console.log("Food added:", response.data);

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
      setImagePreview(null);
      setErrors({});
      toast.success("Food added successfully!");
    } catch (error) {
      console.error(
        "Error adding food:",
        error.response?.data || error.message,
      );
      toast.error(
        error.response?.data ||
          error.message ||
          "Failed to add food. Please try again.",
      );
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        maxWidth: 600,
        p: 4,
        mx: "auto",
        mt: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Add New Food
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        {/* Image Upload */}
        <Box>
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              fullWidth: true,
              height: 140,
              border: errors.image ? "2px dashed red" : "2px dashed #e0e0e0",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&:hover": { backgroundColor: "#fafafa", borderColor: "#ff7a00" },
            }}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhotoCameraIcon sx={{ color: "white" }} />
                </Box>
              </>
            ) : (
              <CloudUploadIcon sx={{ fontSize: 40, color: "#ff7a00" }} />
            )}

            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            )}
            <Typography variant="subtitle2" mb={1}>
              Upload Image *
            </Typography>
          </Box>

          {errors.image && (
            <Typography color="error" variant="caption">
              {errors.image}
            </Typography>
          )}

          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>

        {/* Name */}
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff7a00",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff7a00",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#ff7a00",
              },
            },
          }}
        />

        {/* Description */}
        <TextField
          label="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
          error={!!errors.description}
          helperText={errors.description}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff7a00",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff7a00",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#ff7a00",
              },
            },
          }}
        />

        {/* Category + Price */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#ff7a00",
                },
              },
            }}
            required
            error={!!errors.category}
          >
            <InputLabel>Product Category</InputLabel>
            <Select
              value={category}
              label="Product Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({ ...prev, category: null }));
              }}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
              }}
            >
              {FoodCategory.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>

          <TextField
            label="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            error={!!errors.price}
            helperText={errors.price}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ff7a00",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#ff7a00",
                },
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleAddFood}
          sx={{
            width: "100%",
            bgcolor: "#ff7a00",
            "&:hover": { bgcolor: "#c96304" },
          }}
        >
          ADD
        </Button>
      </Box>
    </Paper>
  );
}

export default Add;
