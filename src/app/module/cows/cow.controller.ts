
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import { CowServices } from "./cow.services";

const createCow = catchAsync(
    async(req:Request, res: Response, next)=> {
        const cow = req.body;
        const result = await CowServices.createCow(cow)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow created successfully',
            data: result,
          });
    }
)

const getAllCow = catchAsync(
    async(req:Request, res: Response, next)=> {
        
        const paginationOptions = pick(req.query, paginationFields);

        const filters = pick(req.query, ['searchTerm', 'location', 'maxPrice', 'minPrice']);
        console.log(paginationOptions);
        console.log(filters)

        const result = await CowServices.getAllCow(
            filters,
            paginationOptions
            );

        sendResponse<ICow[] | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cows retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)


const getSingleCow = catchAsync(
    async(req:Request, res: Response, next)=> {
        const id = req.params.id
        const result = await CowServices.getSingleCow(id);

        sendResponse<ICow | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow retrieved successfully',
            data: result,
        });
    }
)


const updateSingleCow = catchAsync(
    async(req:Request, res: Response, next)=> {
        const  userId  = req?.user?.userId;
        const cowId = req.params.id
        const updatedData = req.body
        const result = await CowServices.updateSingleCow(cowId, updatedData, userId);

        sendResponse<ICow | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    }
)

const deleteSingleCow = catchAsync(
    async(req:Request, res: Response, next)=> {
        
        const  userId  = req?.user?.userId;
        const cowId = req.params.id
   
        const result = await CowServices.deleteSingleCow(cowId, userId);

        sendResponse<ICow | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow deleted successfully',
            data: result,
        });
    }
)


export const CowController = {
    createCow,
    getAllCow,
    getSingleCow,
    updateSingleCow,
    deleteSingleCow,
}