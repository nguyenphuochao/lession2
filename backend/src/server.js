import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import productRoute from "./routers/productRoute.js";
import categoryRoute from "./routers/categoryRoute.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json())

const PORT = process.env.PORT || 5001;

app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listen PORT=${PORT}`);
    });
});
