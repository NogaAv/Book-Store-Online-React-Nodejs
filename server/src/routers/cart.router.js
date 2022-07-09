import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import authUser from '../middlewares/user.auth.js';
import findCart from '../middlewares/user.find-cart.js';

const cartRouter = express.Router();

cartRouter.patch('/cart/add-book/:id', authUser, findCart, cartController.addBook);
cartRouter.patch('/cart/remove-book/:id', authUser, findCart, cartController.removeBook);
cartRouter.patch('/cart/increase-quantity/:id', authUser, findCart, cartController.increaseQuantity);
cartRouter.patch('/cart/decrease-quantity/:id', authUser, findCart, cartController.decreaseQuantity);
cartRouter.patch('/cart/clear', authUser, findCart, cartController.clearCart);
cartRouter.get('/cart', authUser, findCart, cartController.getCart);
cartRouter.patch('/cart/checkout', authUser, findCart, cartController.checkout);

export default cartRouter;
