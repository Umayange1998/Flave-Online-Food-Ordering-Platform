import React, { useRef, useState } from "react";
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

function Add() {
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

  const handleAddFood = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!category) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log({ name, description, price, category, image });
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
          <Typography variant="subtitle2" mb={1}>
            Upload Image *
          </Typography>

          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: 140,
              height: 140,
              border: errors.image
                ? "2px dashed red"
                : "2px dashed #e0e0e0",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&:hover": { backgroundColor: "#fafafa" },
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
              <CloudUploadIcon sx={{ fontSize: 40, color: "#bdbdbd" }} />
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
        />

        {/* Category + Price */}
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <FormControl fullWidth required error={!!errors.category}>
            <InputLabel>Product Category</InputLabel>
            <Select
              value={category}
              label="Product Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({ ...prev, category: null }));
              }}
            >
              {FoodCategory.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
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
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleAddFood}
          sx={{
            width: 150,
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
