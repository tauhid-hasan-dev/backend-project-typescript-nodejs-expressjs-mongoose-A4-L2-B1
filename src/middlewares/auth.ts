import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/ApiError';
import { jwtHelpers } from '../helpers/jwtHelpers';


const auth = (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(requiredRoles)
      //get authorization token (this is the access token)
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verify the access token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role  , userid

      console.log(verifiedUser.role)
      console.log(requiredRoles)

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
      }


      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
