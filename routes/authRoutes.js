import express from "express";
import { register, login, authMiddleware, adminMiddleware,getUserDetails } from "../controllers/authController.js"

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/admin-only-route", authMiddleware, adminMiddleware, (req, res) => {
  res.send("Admin route accessed");
});
authRoute.get("/user-details", authMiddleware, getUserDetails);

export default authRoute;
