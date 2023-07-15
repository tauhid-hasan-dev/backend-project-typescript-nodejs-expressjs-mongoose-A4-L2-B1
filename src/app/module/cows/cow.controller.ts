
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response  } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CowServices } from "./cow.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { ICow } from "./cow.interface";

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
        const id = req.params.id
        const updatedData = req.body
        const result = await CowServices.updateSingleCow(id, updatedData);

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
        const id = req.params.id
        const result = await CowServices.deleteSingleCow(id);

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