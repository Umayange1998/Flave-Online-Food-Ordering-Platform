import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import express, { application } from "express";
import authMiddleware from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/place", authMiddleware, async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData: {}});

        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
                },
            quantity: item.quantity,
        }))
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 50 * 100,
            },
            quantity: 1,
        });
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/verify-payment?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify-payment?success=false&orderId=${newOrder._id}`,
        })
        res.json({success: true, session_url: session.url});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
});

router.post("/verify-payment", async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {paymentStatus: "Paid"});
            res.json({success: true, message: "Payment successful"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment failed"});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
});

//get all the orders by a user//
router.post("/userOrders", authMiddleware, async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId}).sort({createdAt: -1});
        res.json({success: true, data: orders});
    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
});

//get all the orders for admin//
router.get("/allOrders", async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({createdAt: -1});
        res.json({success: true, data: orders});
    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
});

export default router;