import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import globalErrorHandler from './middlewares/globalErrorHandler';

import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import routes from './routes';

/* import ApiError from './errors/ApiError' */

const app: Application = express();

// cors
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// testing unhandled rejection

/* app.use('/', ()=>{
    Promise.reject(new Error ('Unhandled Promise Rejection'))
}) */

app.use('/api/v1/', routes);

app.use(globalErrorHandler);

//  handle not found route
app.get('/', (req, res) => {
  res.send(
    'Cow hut auth project by Tauhid Hasan: Server is running...........'
  );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found For Cow Hut',
      },
    ],
  });
  next();
});

export default app;
