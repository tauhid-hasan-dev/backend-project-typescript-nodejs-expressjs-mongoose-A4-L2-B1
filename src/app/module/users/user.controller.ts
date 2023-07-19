/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser, IUserProfile } from "./user.interface";
import { UserServices } from "./user.services";

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


const getUserProfile = catchAsync(
    async(req:Request, res: Response, next)=> {

        const userId = req?.user?.userId
        const role = req?.user?.role
        const result = await UserServices.getUserProfile(userId, role);

        const userProfile = result as IUserProfile;
       
        const { name, address, phoneNumber } = userProfile;

        sendResponse<IUserProfile | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User's information retrieved successfully",
            data: {name, phoneNumber, address},
        });
    }
)

export const UserController = {
    createUser,
    getSingleUser,
    getAllUser,
    deleteSingleUser,
    updateSingleUser,
    getUserProfile,
}