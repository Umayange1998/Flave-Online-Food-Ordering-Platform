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
        height: {
          xs: "28vh",
          sm: "50vh",
          md: "36vw",
        },
        // minHeight: "420px",

        width: "90%",
        position: "relative",
        color: "#fff",
        mx: "auto",
        mt: {xs:"80px" , sm: "100px", md: "120px"},
        mb: {xs:"40px" , sm: "50px", md: "70px"},
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "absolute",
            // justifyContent: "space-between",
            maxWidth: {
              xs: "90%",
              sm: "70%",
              md: "70%",
            },
            left: {
              xs: "5%",
              md: "6vw",
            },
            bottom: {
              xs: "0%",
              sm: "8%",
              md: "10%",
            },
            //  top: {
            //   xs: "8%",
            //   sm: "30%",
            //   md: "30%",
            // },

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
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.75rem",
                lg: "3.75rem",
              },
            }}
          >
            Delicious Food Awaits
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
                md: "1.2rem",
                lg: "1.5rem",
              },
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
            sx={{
              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
                md: "1rem",
              },
              py: {
                xs: "0.2rem",
                md: "0.8rem",
              },
              px: {
                xs: "1rem",
                md: "2.5rem",
              },
              borderRadius: "30px",
              backgroundColor: "#fff",
              color: "#000",
              "&:hover": { backgroundColor: "#999999" },
            }}
          >
            View Menu
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

export default Header;
