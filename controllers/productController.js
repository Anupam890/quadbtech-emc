import Product from "../db/schema/products.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      productname,
      description,
      price,
      mrp,
      category,
      measurements,
      details,
      colors,
      additionalInfo,
      stock,
      sku_id,
      packaging,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const images = req.files.map((file) => ({
      url: file.path,
      altText: file.originalname,
    }));

    const newProduct = new Product({
      productname,
      description,
      price,
      mrp,
      category,
      images,
      measurements,
      details,
      colors: JSON.parse(colors || "[]"),
      additionalInfo,
      stock,
      sku_id,
      packaging: JSON.parse(packaging || "{}"),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validUpdates = Object.keys(Product.schema.obj);
    const updates = Object.keys(req.body).reduce((acc, key) => {
      if (validUpdates.includes(key)) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProductById, createProduct, updateProduct, upload };
