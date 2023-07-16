import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async(user:IAdmin):Promise<IAdmin | null> => {
    if(!user.password){
     user.password = config.default_admin_pass as string;
    }
    const createdAdmin = await Admin.create(user)
 
    if(!createAdmin){
     throw new ApiError(400,'Failed! Admin could not be created')
    }
    return createdAdmin;
 }

 const loginAdmin = async (payload: ILoginAdmin): Promise<ILoginAdminResponse> => {
    const { phoneNumber, password } = payload;
    console.log(password)
  
    const admin = new Admin();
  
    // check admin is exist or not by phone number
    const isAdminExist = await admin.isAdminExist(phoneNumber);
    console.log(isAdminExist);
    
    if (!isAdminExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exists');
    }
    
    // match password (using instance methods)
    if (isAdminExist.password && !(await admin.isPasswordMatched(password, isAdminExist?.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
      /* console.log('password is false SDKLFJHSDKLFJ') */
    }

    //create access token & refresh token
    const { _id: adminId, role } = isAdminExist;
  
    const accessToken = jwtHelpers.createToken(
      { userId: adminId, role , phoneNumber},
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    const refreshToken = jwtHelpers.createToken(
      { userId: adminId, role, phoneNumber },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };

  


export const AdminServices = {
    createAdmin,
    loginAdmin
}