import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { phoneNumber, password } = payload;
    console.log(password)
  
    const user = new User();
  
    // check user is exist or not by phone number
    const isUserExist = await user.isAdminExist(phoneNumber);
    console.log(isUserExist);
    
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exists');
    }
    
    // match password (using instance methods)
    if (isUserExist.password && !(await user.isPasswordMatched(password, isUserExist?.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    //create access token & refresh token
    const { _id: userId, role } = isUserExist;
  
    const accessToken = jwtHelpers.createToken(
      { userId: userId, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelpers.createToken(
      { userId: userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };


export const AuthService = {
    loginUser,
  };