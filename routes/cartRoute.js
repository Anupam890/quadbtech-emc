import express from 'express';
import { getCart, addItemToCart, removeItemFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.get('/cart', getCart);
cartRouter.post('/cart', addItemToCart);
cartRouter.delete('/cart/:id', removeItemFromCart);

export default cartRouter;
