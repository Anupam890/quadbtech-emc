import { Router } from "express";
import multer from "multer";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const productRoute = Router();

productRoute.get("/products", getProducts);

productRoute.get("/products/:id", getProductById);

productRoute.post("/addproduct", upload.array('images', 3), createProduct);

productRoute.put("/products/:id", upload.array('images', 3), updateProduct);

export default productRoute;
