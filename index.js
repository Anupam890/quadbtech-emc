import express, { urlencoded } from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
//api routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api", cartRouter);

connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
