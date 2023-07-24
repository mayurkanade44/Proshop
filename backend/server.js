import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server is running"));
