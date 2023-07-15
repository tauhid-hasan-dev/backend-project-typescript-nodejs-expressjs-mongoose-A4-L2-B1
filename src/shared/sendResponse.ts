import { Response } from "express";

type IApiResponse<T> = {
    statusCode : number,
    success: boolean,
    message: string | null,
    meta? : {
        page: number,
        limit: number,
        total: number
    }
    data: T,
}

const sendResponse = <T>(res: Response, data:IApiResponse<T> ) => {
    const responseData = {
        statusCode : data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta,
        data: data.data,
    }
    res.status(data.statusCode).json(responseData)
}

export default sendResponse;