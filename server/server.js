import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

//app config
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT ;
//db config
connectDB();

//Routers
import foodRouter from "./routes/Food.js";
import userRouter from "./routes/User.js";
import cartRouter from "./routes/Cart.js";
import orderRouter from "./routes/Orders.js";

app.use("/user",userRouter);
app.use("/food",foodRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);



app.listen(port,()=>{
    console.log("Server is running on port "+port);
})

