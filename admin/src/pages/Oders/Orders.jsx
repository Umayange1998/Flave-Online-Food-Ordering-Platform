import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";

function Orders() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get(BASE_URL + "/order/allOrders");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "20px",
        maxWidth: "75%",
        my: 0,
        ml: "20%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "80px",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Orders
        </Typography>
      </Grid>
      <Grid size={12}>
        {orders.length === 0 && (
          <Typography variant="h6">No orders found</Typography>
        )}
        {orders.map((order, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Inventory2Icon
              sx={{
                color: "#ff751f",
                width: "60px",
                height: "40px",
                padding: 0,
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  width: "250px",
                  textAlign: "left",
                }}
              >
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </Typography>
            </Box>
            <Box
             sx={{
                width: "250px",
                textAlign: "left",
              }}>
            <Typography
              variant="body2"
             
            >
              {order.address.firstName + " " + order.address.lastName}
            </Typography>
            
              <Typography variant="body2"> {order.address.street}</Typography>
              <Typography variant="body2">
                {" "}
                {order.address.city +
                  ", " +
                  order.address.state +
                  " - " +
                  order.address.zipCode}
              </Typography>
              <Typography variant="body2">
                {order.address.phoneNumber}
              </Typography>
            </Box>

            <Typography
             sx={{
                width: "80px",
                textAlign: "left",
              }}>Item : {order.items.length}</Typography>
            <Typography 
             sx={{
                width: "80px",
                textAlign: "left",
              }}> ${order.amount}</Typography>
            <Select sx={{
              padding:0,
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff7a00",
              },
              my:"auto"
            }}
            size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order.status}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="preparing">preparing</MenuItem>
              <MenuItem value="delivering">delivering</MenuItem>
              <MenuItem value="delivered">delivered</MenuItem>
            </Select>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default Orders;
