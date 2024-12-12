import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
    },
    category: {
      type: String,
      enum:['Living Room','Bedroom','kitchen']

    },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    measurements: {
      type: String,
    },
    details: {
      type: String,
    },
    colors: [
      {
        name: { type: String },
        hexCode: { type: String },
      },
    ],
    additionalInfo: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    sku_id:{
      type:Number
    },
    reviews: [
      {
        name: { type: String },
        email: { type: String },
        rating: { type: Number },
        review: { type: String },
      },
    ],
    packaging:[
      {
        width:{type:Number},
        height:{type:Number},
        length:{type:Number},
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
