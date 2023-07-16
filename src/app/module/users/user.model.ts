/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import config from '../../../config';
import { userRoles } from "./user.constant";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>({
    password:{
        type: String,
        required: true,
        select: 0
    },
    role: {
        type: String,
        enum: userRoles,
        required: true
    },
    name:{
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
    },
    phoneNumber:{ type: String, required: true, unique: true},
    address: { type: String, required: true},
    budget:{ type: Number, required: true},
    income:{ type: Number, required: true},
  },
  {
    timestamps: true,
  }
  );

userSchema.methods.isAdminExist = async function (phoneNumber: string): Promise<Pick<IUser, '_id' | 'role' | 'password' > | null> {
  // check user is exist or not
  const user = await User.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
  return user;
};
  
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isPasswordMatched;
};

  // Define a method to exclude the password field when converting to JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
  
// Duplicate Error (phoneNumber)
/* userSchema.pre('save', async function(next){
  const isExit = await User.findOne({phoneNumber: this.phoneNumber});
  if(isExit){
      throw new ApiError(httpStatus.CONFLICT, 'This User is already exits')
  }
  next()
}) */

export const User = model<IUser, UserModel>('User', userSchema);