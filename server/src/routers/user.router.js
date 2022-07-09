import express from 'express'; //for creating Router object
import * as userController from '../controllers/user.controller.js';
import authUser from '../middlewares/user.auth.js';

//'userRouter' will be used as a middleware for every incoming request
const userRouter = express.Router();

userRouter.post('/user/signup', userController.createUser);
userRouter.patch('/user/login', userController.login);
userRouter.patch('/user/logout', authUser, userController.logout);
userRouter.get('/user/accountInfo', authUser, userController.getAccount);

export default userRouter;
