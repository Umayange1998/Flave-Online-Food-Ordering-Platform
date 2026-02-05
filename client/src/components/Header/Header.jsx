import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import img from "../../assets/food-bg.png";
import { keyframes } from "@mui/system";
function Header() {
  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

  return (
    <Card
      sx={{
        // maxWidth: 345,
        height: "34vw",
        width: "90%",
        position: "relative",
        color: "#fff",
        margin: "100px auto",
        padding: 0,
        borderRadius: "20px",
      }}
    >
      {/* Background Image */}
      <CardMedia
        component="img"
        image={img}
        alt="food background"
        sx={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {/* Optional dark overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "50%",
            bottom: "10%",
            left: "6vw",
            animation: `${fadeIn} 3s ease`,
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "poppins",
              textAlign: "left",
              mb: "0",
            }}
          >
            Delicious Food Awaits
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.2rem",
              fontFamily: "roboto",
              textAlign: "left",
              display: "flex",
              my: "1rem",
            }}
          >
            Enjoy a variety of delicious dishes made from fresh ingredients,
            crafted to satisfy your taste buds.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              "&:hover": { backgroundColor: "#999999" },
              borderRadius: "30px",
              fontFamily: "roboto",
              py: "0.8rem",
              px: "2.5rem",
            }}
          >
            Menu
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

export default Header;
