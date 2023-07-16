import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Admin } from "../admin/admin.model";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";


const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { phoneNumber, password } = payload;
    console.log(password)
  
    const user = new User();
 

    // check user is exist or not by phone number
    const isUserExist = await user.isAdminExist(phoneNumber);
    console.log(isUserExist);
    
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
    }
    // match password (using instance methods)
    if (isUserExist.password && !(await user.isPasswordMatched(password, isUserExist?.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, role } = isUserExist;
  
    const accessToken = jwtHelpers.createToken(
      { userId: userId, role , phoneNumber},
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelpers.createToken(
      { userId: userId, role , phoneNumber},
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };


  const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

    //verify refresh token
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers.verifyToken(
        token,
        config.jwt.refresh_secret as Secret
      );
    } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
  
    const { phoneNumber, role } = verifiedToken;
    console.log(phoneNumber)
  
    // even if we got the refresh token verified we need to check the user exists or not 
    // checking deleted user's refresh token

    const user = new User();
    const admin = new Admin();

    let newAccessToken = null;

    if(role === 'seller' || role === 'buyer'){
        // check user is exist or not by phone number
        const isUserExist = await user.isAdminExist(phoneNumber);
        console.log(isUserExist);

        if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
        }

        newAccessToken = jwtHelpers.createToken(
            {
                id: isUserExist._id,
                role: isUserExist.role,
                phoneNumber: isUserExist.phoneNumber,
            },
            config.jwt.secret as Secret,
            config.jwt.expires_in as string
        );
    }

    if(role === 'admin'){
        // check user is exist or not by phone number
        const isAdminExist = await admin.isAdminExist(phoneNumber);
        console.log(isAdminExist);

        if (!isAdminExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exists');
        }

        newAccessToken = jwtHelpers.createToken(
            {
                id: isAdminExist._id,
                role: isAdminExist.role,
                phoneNumber: isAdminExist.phoneNumber,
            },
            config.jwt.secret as Secret,
            config.jwt.expires_in as string
        );
    }
  
    
    return {
      accessToken: newAccessToken,
    };
  };
  

export const AuthService = {
    loginUser,
    refreshToken
  };