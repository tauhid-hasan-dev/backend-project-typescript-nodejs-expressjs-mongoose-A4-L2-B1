/* eslint-disable @typescript-eslint/no-unused-vars */
import { /* NextFunction, */ Request, Response } from 'express';
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
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


const getSingleOrder = catchAsync(
  async(req:Request, res: Response, next)=> {
      const userId = req?.user?.userId
      const role = req?.user?.role
      const orderId = req.params.id
      const result = await OrderServices.getSingleOrder(orderId, userId, role);

      sendResponse<IOrder | null>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Order retrieved successfully',
          data: result,
      });
  }
)

export const OrderController = {
  createOrder,
  getAllOrder, 
  getSingleOrder
};