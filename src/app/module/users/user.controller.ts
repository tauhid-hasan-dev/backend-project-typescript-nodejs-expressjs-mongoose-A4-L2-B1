/* eslint-disable @typescript-eslint/no-unused-vars */
import {Request , Response} from "express";
import { UserServices } from "./user.services"
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";

const createUser = catchAsync(async(req: Request, res:Response )=> {    
        const user = req.body;
        const result = await UserServices.createUser(user);

        sendResponse<IUser | null>(res, {
                statusCode : httpStatus.OK,
                success: true,
                message: 'Users created successfully',
                data: result
        })       
})


const getAllUser = catchAsync(async(req: Request, res:Response )=> {    
  
        const result = await UserServices.getAllUser();

        sendResponse<IUser[] | null>(res, {
                statusCode : httpStatus.OK,
                success: true,
                message: 'Users retrieved successfully',
                data: result
        })       
})




const getSingleUser = catchAsync(
        async(req:Request, res: Response, next)=> {
            const id = req.params.id
            const result = await UserServices.getSingleUser(id);
    
            sendResponse<IUser | null>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User retrieved successfully',
                data: result,
            });
        }
    )


const updateSingleUser = catchAsync(
        async(req:Request, res: Response, next)=> {
            const id = req.params.id
            const updatedData = req.body
            const result = await UserServices.updateSingleUser(id, updatedData);
    
            sendResponse<IUser | null>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User updated successfully',
                data: result,
            });
        }
    )


const deleteSingleUser = catchAsync(
        async(req:Request, res: Response, next)=> {
            const id = req.params.id
            const result = await UserServices.deleteSingleUser(id);
    
            sendResponse<IUser | null>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'User deleted successfully',
                data: result,
            });
        }
    )

export const UserController = {
    createUser,
    getSingleUser,
    getAllUser,
    deleteSingleUser,
    updateSingleUser
}