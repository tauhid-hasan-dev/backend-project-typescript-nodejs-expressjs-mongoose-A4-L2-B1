/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler} from 'express';
import { IGenericErrorMessage } from '../interfaces/error';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import ApiError from '../errors/ApiError';
/* import { errorLogger } from '../shared/logger'; */
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler : ErrorRequestHandler = (
    error, req, res, next
  ) => {
    // we are doing this because in the development we don not want see the logger(console is enough) but for the production we will see the logger
    /* config.env === 'development'
    ? console.log('🌍 globalErrorHandler -', error)
    : errorLogger.error('🌍 globalErrorHandler -', error); */
     
     let statusCode = 500;
     let message = 'Internal Server Error!';
     let errorMessages : IGenericErrorMessage[] = [];

     if (error?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      } 
      else if (error?.name === 'CastError') {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages}
      else if(error instanceof ZodError){
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
      }
      else if (error instanceof ApiError) {
        (statusCode = error?.statusCode),
          (message = error?.message),
          (errorMessages = error?.message
            ? [
                {
                  path: '',
                  message: error?.message,
                },
              ]
            : []);
      }
      else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error.message
          ? [
              {
                path: '',
                message: error.message,
              },
            ]
          : [];
      }

    // we will send errors to the frontend in this pattern (this will be common pattern for all the errors)
     res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? error?.stack : undefined,
      });

     /*  next() */
  };
  
export default globalErrorHandler;