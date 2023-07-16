import { Model } from "mongoose";

export type UserName = {
    firstName: string;
    lastName: string;
  };

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type IAdmin = {
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: UserName;
    address: string;
    _id?: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IAdminMethods = {
  
  isAdminExist(
   phoneNumber: string
  ): Promise<Pick<
    IAdmin,
     '_id' |'role' | 'password' | 'phoneNumber'
  > | null>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
  