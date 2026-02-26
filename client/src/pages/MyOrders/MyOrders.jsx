import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import FastfoodIcon from '@mui/icons-material/Fastfood';

function MyOrders() {
  const [data, setData] = useState([]);
  const { token, BASE_URL } = useContext(StoreContext);
  const handleGetOrders = async () => {
    const response = await axios.post(
      BASE_URL + "/order/userOrders",
      {},
      { headers: { token } },
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      handleGetOrders();
    }
  }, [token]);

  return (
    <Grid container  sx={{ padding: "20px", maxWidth: "80%", margin: "0 auto",minHeight:"80vh", display:"flex", flexDirection:"column" }}>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center", height: "80px",mb:2, alignItems: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          My Orders
        </Typography>
      </Grid>
      <Grid size={12} >
        {data.length === 0 && (
          <Typography variant="h6">No orders found</Typography>
        )}
        {data.map((order, index) => {
          return (
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
                <FastfoodIcon sx={{ color: "#ff751f", width: "60px", height: "40px", padding: 0 }} />
              <Typography sx={{
                fontSize:"0.8rem",
                width:"250px",
                textAlign:"left"
              }}>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </Typography>
              <Typography
              sx={{
                width:"80px",
                textAlign:"left"
              }}>${order.amount}</Typography>
              <Typography
              sx={{
                width:"80px",
                textAlign:"left"
              }}>Items: {order.items.length}</Typography>
              <Typography sx={{ fontWeight: "bold",
                width:"100px",
                textAlign:"left"
               }}>
                <span>&#x25cf;</span>
                {order.status}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#ff751f",
                  "&:hover": {
                    backgroundColor: "#803201",
                  },
                }}
                onClick={handleGetOrders}
              >
                Track Order
              </Button>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default MyOrders;
