/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { /* NextFunction, */ Request, Response } from 'express';
import { IOrder } from "./order.interfaces";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req: Request, res: Response, next) => {
  const orderData = req.body;
  const result = await OrderServices.createOrder(orderData);

  sendResponse<IOrder | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
  /*  next(); */
});

const getAllOrder = catchAsync(async(req: Request, res:Response )=> {    
  
    const result = await OrderServices.getAllOrder();

    sendResponse<IOrder[] | null>(res, {
            statusCode : httpStatus.OK,
            success: true,
            message: 'Orders retrieved successfully',
            data: result
    })       
})

export const OrderController = {
  createOrder,
  getAllOrder
};