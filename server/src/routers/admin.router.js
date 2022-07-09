import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import authAdmin from '../middlewares/admin.auth.js';

const adminRouter = express.Router();

//Only an already existing admin can create other admin
adminRouter.post('/admin/add', authAdmin, adminController.createAdmin);
adminRouter.patch('/admin/login', adminController.login);
adminRouter.patch('/admin/logout', authAdmin, adminController.logout);
adminRouter.get('/admin/accountInfo', authAdmin, adminController.getAccount);

export default adminRouter;
