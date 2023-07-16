import { Model } from 'mongoose';

export type IUserRoles = 'seller' | 'buyer';

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  password:string,
  role: IUserRoles,
  name:{
    firstName: string,
    lastName: string
  },
  phoneNumber:string,
  address: string,
  budget:number,
  income:number,
  _id?: string,
}

export type IUserMethods = {
  isAdminExist(
   phoneNumber: string
  ): Promise<Pick<
    IUser,
     '_id' |'role' | 'password' 
  > | null>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};


export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;