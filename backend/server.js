import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
