import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import { Grid } from '@mui/material';

function Cart() {
  const {cartItems, food_list,removeFromCart} = useContext(StoreContext);
  return (
    <Grid container spacing={2}
    sx={{
      height:'100vh'
    }}
    >
      <Grid size={12}>
Cart
      </Grid>
      </Grid>
  )
}

export default Cart