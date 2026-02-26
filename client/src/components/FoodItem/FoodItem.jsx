import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
function FoodItem({ id, name, description, price, image }) {

    const {cartItems, addToCart, removeFromCart,BASE_URL} = useContext(StoreContext);
    console.log("BASE_URL:", BASE_URL);
console.log("image:", image);

  return (
    <Card
      sx={{
        maxWidth: { xs: 160, sm: 200, md: 240 },
        width: "100%",
        height: "100%",
        // gap: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mx: "auto",
      }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <CardMedia
          component="img"
          image={`${BASE_URL}/uploads/${image}`}
          alt={name}
          sx={{
            height: { xs: 80, sm: 100, md: 140 },
            objectFit: "cover",
          }}
        />

        {!cartItems[id] ? (
          <IconButton
            onClick={() => addToCart(id)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#fff",
              p: 0,
            }}
          >
            <AddCircleOutlineTwoToneIcon sx={{ color: "#000000" }} fontSize="large" />
          </IconButton>
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#fff",
              borderRadius: 5,
              px: 1,
            }}
          >
            <IconButton
              onClick={() => removeFromCart(id)}
              disabled={cartItems[id] === 0}
            >
              <RemoveCircleOutlineTwoToneIcon sx={{ color: "#ff4a4a" }} />
            </IconButton>

            <Typography>{cartItems[id]}</Typography>

            <IconButton onClick={() => addToCart(id)}>
              <AddCircleOutlineTwoToneIcon sx={{ color: "#4caf50" }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          height: "100%",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          textAlign={"left"}
          justifyContent="space-between"
          height="100%"
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
              fontWeight: "600",
            }}
            // gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <img
            style={{ width: "50%" }}
            src={assets.Star_rating}
            alt="Star rating"
          />

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
              color: "#ff751f",
            }}
          >
            ${price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
    
  );
}

export default FoodItem;
