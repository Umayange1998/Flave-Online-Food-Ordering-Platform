import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, BASE_URL } =
    useContext(StoreContext);
  const deliveryFee = 2.99;
  const subtotal = getTotalCartAmount();
  const [errors, setErrors] = useState({});
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }))
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee,
    };
    console.log("API URL:", BASE_URL + "/order/place");
    let response = await axios.post(BASE_URL + "/order/place", orderData, {headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      toast.error("Failed to place order. Please try again.");
    }
  };
  const validateForm = () => {
    for (let key in data) {
      if (!data[key].trim()) {
        setErrors((prev) => ({ ...prev, [key]: `${key} is required` }));
        return false;
      }
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      setErrors((prev) => ({ ...prev, phoneNumber: "Phone number must be 10 digits" }));
      return false;
    }

    const zipRegex = /^[0-9]{4,6}$/;
    if (!zipRegex.test(data.zipCode)) {
      setErrors((prev) => ({ ...prev, zipCode: "Invalid zip code" }));
      return false;
    }

    return true;
  };
useEffect(() => {
  if (!token) {
    navigate("/cart");
  }else if (subtotal === 0) {
    navigate("/cart");
  }

},[token, navigate])

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
          <TextField
            size="small"
            name="firstName"
            value={data.firstName}
            onChange={onchangeHandler}
            label="First Name"
            type="text"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            size="small"
            name="lastName"
            value={data.lastName}
            onChange={onchangeHandler}
            label="Last Name"
            type="text"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            size="small"
            name="street"
            value={data.street}
            onChange={onchangeHandler}
            label="Street"
            type="text"
            fullWidth
            error={!!errors.street}
            helperText={errors.street}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            size="small"
            name="city"
            value={data.city}
            onChange={onchangeHandler}
            label="City"
            type="text"
            fullWidth
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            size="small"
            name="state"
            value={data.state}
            onChange={onchangeHandler}
            label="State"
            type="text"
            fullWidth
            error={!!errors.state}
            helperText={errors.state}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          sx={{ mt: 2 }}
        >
          <TextField
            size="small"
            name="zipCode"
            value={data.zipCode}
            onChange={onchangeHandler}
            label="Zip Code"
            type="text"
            fullWidth
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
          <TextField
            size="small"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={onchangeHandler}
            label="Phone Number"
            type="text"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
        <Typography
          variant="h2"
          sx={{
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
          <Typography>
            $ {subtotal === 0 ? "0.00" : deliveryFee.toFixed(2)}
          </Typography>
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
          <Typography>
            $ {subtotal === 0 ? "0.00" : total.toFixed(2)}
          </Typography>
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
            onClick={handlePlaceOrder}
          >
            Proceed to Pay
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PlaceOrder;
