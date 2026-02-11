import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { assets } from "../../assets/assets";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Grid
      container
      justifyContent="space-between"
      //   alignItems="center"
      sx={{ backgroundColor: "#323232", 
        mt: "50px",
    // position: "relative",
    // bottom: 0,
    // width: "100%",
    }}
      spacing={2}
      pt={5}
    >
      <Grid
        size={{ xs: 6, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          pl: "5%",
        }}
      >
        <Box>
          <img
            src={assets.Logo}
            alt="logo"
            style={{
              width: "80px",
            }}
          />
        </Box>
      </Grid>
      <Grid
        size={{ xs: 6, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography>
          <a
            href="#"
            style={{
              color: "#999999",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Home
          </a>
        </Typography>
        <Typography>
          <a
            href="#"
            style={{
              color: "#999999",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Privacy Policy
          </a>
        </Typography>
        <Typography>
          <a
            href="#"
            style={{
              color: "#999999",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {" "}
            About Us
          </a>
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          pb: 3,
          pl: { xs: "5%", md: 0 },
        }}
      >
        <Typography
          style={{
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          style={{
            color: "#999999",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
          }}
        >
          Email: info@flave.com
        </Typography>
        <Typography
          style={{
            color: "#999999",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
          }}
        >
          Phone: +1 (123) 456-7890
        </Typography>
        <IconButton sx={{ mr: 1, p: 0, mt: 1 }}>
          <FacebookIcon
            sx={{ color: "#ffffff", width: "40px", height: "40px" }}
          />
        </IconButton>
        <IconButton sx={{ p: 0, mt: 1 }}>
          <InstagramIcon
            sx={{ color: "#ffffff", width: "40px", height: "40px" }}
          />
        </IconButton>
      </Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Divider
          sx={{
            mt: 0,
            height: "1px",
            backgroundColor: "#999999",
            border: "none",
            mx: "auto",
            width: "90%",
          }}
        />
        <Box>
          <p
            style={{
              color: "#999999",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            &copy; {new Date().getFullYear()} Flave. All rights reserved.
          </p>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
