import express from 'express'
import { OrderController } from './order.controller';


const orderRouter = express.Router();

orderRouter.post('/orders',  OrderController.createOrder);
orderRouter.get('/orders', OrderController.getAllOrder)


export const OrderRoutes = orderRouter;