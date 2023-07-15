import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
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


export const AdminServices = {
    createAdmin,
}