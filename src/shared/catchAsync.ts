import { NextFunction, Request, Response, RequestHandler } from "express"

const catchAsync = (fn: RequestHandler) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
           await fn(req, res, next)
        }catch(error){
            /* console.log(error) */
            // in here we are sending the error to global error handler
            next(error)
        }
    }
}

export default catchAsync;