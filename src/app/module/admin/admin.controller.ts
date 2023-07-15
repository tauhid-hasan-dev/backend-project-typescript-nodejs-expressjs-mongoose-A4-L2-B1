/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {  Request, Response } from 'express';
import { IAdmin } from "./admin.interface";
import { AdminServices } from "./admin.services";

const createAdmin = catchAsync(async (req: Request, res: Response, next) => {
  const adminData = req.body;
  const result = await AdminServices.createAdmin(adminData);

  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
};