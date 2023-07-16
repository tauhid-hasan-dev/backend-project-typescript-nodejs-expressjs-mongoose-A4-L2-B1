/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.services";
import { ILoginUserResponse } from './auth.interface';

const loginUser = catchAsync(async (req: Request, res: Response, next) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: others,
    });
  });

  export const AuthController = {
    loginUser,
    /* refreshToken, */
  };