import React from 'react'
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Veryfy() {

    const [searchParams, setSerchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {BASE_URL} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(BASE_URL + "/order/verify-payment", {orderId, success});
        if(response.data.success){
            toast.success("Payment successful");
            navigate("/my-orders");
        }
        else{
            toast.error("Payment failed");
            navigate("/");
        }
        
    }
    useEffect(()=>{
        verifyPayment();
    },[])
    return (
     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress sx={{color: "#ff751f", minWidth: {sx:"50px", sm:"100px"}, minHeight: {sx:"50px", sm:"100px"}}} />
    </Box>
  )
}

export default Veryfy