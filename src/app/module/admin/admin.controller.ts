/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from "http-status";
import config from '../../../config';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin, ILoginAdminResponse } from "./admin.interface";
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

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminServices.loginAdmin(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin logged in successfully !',
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin
};