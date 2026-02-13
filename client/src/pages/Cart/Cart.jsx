import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import RemoveCircleOutlineTwoToneIcon from "@mui/icons-material/RemoveCircleOutlineTwoTone";

function Cart() {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount } =
    useContext(StoreContext);
    const navigate = useNavigate();

    const deliveryFee = 2.99;
  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        mt: "30px",
        mx: "5%",
      }}
    >
      <Grid
        size={{ xs: 12, sm: 8 }}
        component={Paper}
        sx={{ minHeight: { sm: "60vh" } }}
      >
        <TableContainer sx={{ height: "100%" }}>
          <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Items
                </TableCell>
                <TableCell align="left" sx={{ py: 2 }}>
                  Title
                </TableCell>
                <TableCell align="left" sx={{ py: 2 }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  Quantity
                </TableCell>
                <TableCell align="left" sx={{ py: 2 }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {food_list.map((item, index) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          display: { xs: "none", sm: "table-cell" },
                        }}
                        component="th"
                        scope="row"
                      >
                        <img
                          style={{
                            width: "80px",
                            // height: { xs: '30px', sm: '60px' },
                            objectFit: "cover",
                          }}
                          src={item.image}
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      >
                        $. {item.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                      >
                        <Box
                          width={"100%"}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          <IconButton
                            onClick={() => removeFromCart(item._id)}
                            disabled={cartItems[item._id] === 0}
                          >
                            <RemoveCircleOutlineTwoToneIcon
                              sx={{ color: "#ff4a4a" }}
                            />
                          </IconButton>
                          <Typography
                            sx={{
                              fontSize: { xs: "0.8rem", sm: "1rem" },
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {cartItems[item._id]}
                          </Typography>

                          <IconButton onClick={() => addToCart(item._id)}>
                            <AddCircleOutlineTwoToneIcon
                              sx={{ color: "#4caf50" }}
                            />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: { xs: "0.6rem", sm: "1rem" } }}
                      >
                        $. {item.price * cartItems[item._id]}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 4 }}
        component={Paper}
        sx={{ minHeight: { sm: "60vh" } }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
            Order Summary
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Subtotal:</Typography>
          <Typography>$ {getTotalCartAmount()}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Delivery fee:</Typography>
          <Typography>$ {deliveryFee}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2 }}>
          <Typography>Total:</Typography>
          <Typography>$ {getTotalCartAmount() + deliveryFee}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={{ xs: "center", sm: "flex-start" }} sx={{ p: 2 }}>
          <Button variant="contained"
           sx={{ backgroundColor: "#ff751f" }}
           onClick={()=>navigate('/placeorder')}>
            Proceed to Checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Cart;
