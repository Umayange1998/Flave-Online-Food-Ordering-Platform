import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const deliveryFee = 2.99;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
      sx={{
        minHeight: "100vh",
        mt: { xs: "50px", sm: "150px", md: "150px" },
        mx: "5%",
      }}
    >
      <Grid size={{ xs: 12, sm: 5 }} sx={{ maxHeight: "50vh" }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            fontFamily: "open-sans, sans-serif",
            textAlign: "left",
          }}
        >
          Delivery Information
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField size="small" label="First Name" type="text" fullWidth />
          <TextField size="small" label="Last Name" type="text" fullWidth />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField size="small" label="Streete" type="text" fullWidth />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField size="small" label="City" type="text" fullWidth />
          <TextField size="small" label="State" type="text" fullWidth />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField size="small" label="Zip Code" type="text" fullWidth />
          <TextField size="small" label="Phone Number" type="text" fullWidth />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            fontFamily: "open-sans, sans-serif",
            textAlign: "left",
          }}
        >
          Cart Summary
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Subtotal:</Typography>
          <Typography>$ {subtotal.toFixed(2)}</Typography>
        </Box>
        <Divider
          sx={{
            mt: 0,
            height: 2,
            backgroundColor: "#999999",
            border: "none",
            mx: "auto",
            width: "90%",
          }}
        />

        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Delivery fee:</Typography>
          <Typography>$ {subtotal===0?"0.00":deliveryFee.toFixed(2)}</Typography>
        </Box>
        <Divider
          sx={{
            mt: 0,
            height: 2,
            backgroundColor: "#999999",
            border: "none",
            mx: "auto",
            width: "90%",
          }}
        />
        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Total:</Typography>
          <Typography>$ {subtotal===0?"0.00":total.toFixed(2)}</Typography>
        </Box>
        <Divider
          sx={{
            mt: 0,
            height: 2,
            backgroundColor: "#999999",
            border: "none",
            mx: "auto",
            width: "90%",
          }}
        />
        <Box
          display={"flex"}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          sx={{ p: 2 }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ff751f" }}
            // onClick={() => navigate("/placeorder")}
          >
            Proceed to Pay
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PlaceOrder;
