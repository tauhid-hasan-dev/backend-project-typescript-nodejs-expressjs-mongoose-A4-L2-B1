
import bcrypt from 'bcrypt';
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser, IUserProfile } from "./user.interface";
import { User } from "./user.model";

const createUser = async(user:IUser):Promise<IUser | null> => {
   if(!user.password){
    user.password = config.default_user_pass as string;
   }
   const createdUser = await User.create(user)

   if(!createUser){
    throw new ApiError(400,'Failed! User could not be created')
   }
   return createdUser;
}

const getAllUser = async(): Promise<IUser[]>=> {
    const result = await User.find();
    return result;
  }

const getSingleUser = async(id: string ): Promise<IUser | null>=> {
    const result = await User.findById(id);
    return result;
  }


const updateSingleUser = async(id: string , payload: Partial<IUser>): Promise<IUser | null>=> {

  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found !');
  }
  console.log(isExist);
  console.log(payload);
  const { name, ...userData } = payload;
  console.log(name)
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // converting a new property of user object 
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name]; // the just udating the previous value 
    });
  }

  console.log(updatedUserData)

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
  }


const deleteSingleUser = async(id: string ): Promise<IUser | null>=> {
    const result = await User.findByIdAndDelete(id);
    return result;
}

const getUserProfile = async(userId: string, role: string ): Promise<IUserProfile | null>=> {
  console.log(userId, role)
  const  result = await User.findOne({ _id: userId , role: role});
  console.log(result);
  return result;
}


const updateUserProfile = async (
  userId: string, role: string,
  payload: Partial<IUser>
): Promise<IUserProfile | null> => {
  const isExist = await User.findOne({ _id : userId, role: role });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User profile not found !');
  }

  const { name, password, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // converting a new property of user object 
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name]; // the just udating the previous value 
    });
  }
  
  // password is being hashed before updating 
  if(password){
    updatedUserData.password = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
  }
  const result = await User.findOneAndUpdate({ _id: userId }, updatedUserData, {
    new: true,
  });

  return result;
};


export const UserServices = {
    createUser,
    getSingleUser,
    getAllUser,
    deleteSingleUser,
    updateSingleUser,
    getUserProfile,
    updateUserProfile
}