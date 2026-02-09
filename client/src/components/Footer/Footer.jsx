import { Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { assets } from "../../assets/assets";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Grid
      container
      justifyContent="space-between"
    //   alignItems="center"
      sx={{ backgroundColor: "#323232", mt: "50px" }}
      spacing={2}
      pt={5}
    >
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          pl: 6,
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
      <Grid size={{ xs: 4, md: 4 }}
    sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:{xs:"flex-end", sm:'flex-start'}
    }}>
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
      <Grid size={{ xs: 8, md: 4 }}
        sx={{
          pb: 3,
        }}
      >
        <Typography
        style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight:'bold'
            }}>
            Contact Us
        </Typography>
        <Typography
         style={{
              color: "#999999",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight:'bold'
            }}>
            Email: info@flave.com
        </Typography>
        <Typography
         style={{
              color: "#999999",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight:'bold'
            }}>
            Phone: +1 (123) 456-7890
        </Typography>
        <IconButton
          sx={{ mr: 1,
            p: 0,
            mt: 1
           }}>
          <FacebookIcon sx={{color:'#ffffff',
          width:'40px', height:'40px'
          }} />
        </IconButton>
        <IconButton
          sx={{ p: 0,
            mt: 1
           }}>
          <InstagramIcon sx={{color:'#ffffff',
          width:'40px', height:'40px'
          }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Footer;
