import express from 'express';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { OrderController } from './order.controller';


const orderRouter = express.Router();

orderRouter.post('/orders', auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
orderRouter.get('/orders', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER,), OrderController.getAllOrder);
orderRouter.get('/orders/:id', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER,), OrderController.getSingleOrder);


export const OrderRoutes = orderRouter;