/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import config from "../../../config";
import { AdminModel, IAdmin } from "./admin.interface";

const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
    phoneNumber: { type: String, required: true , unique: true},
    role: { type: String, enum: ['admin'], required: true },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    name: {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          }
      },
    address: { type: String, required: true },
  },
);

// Define a method to exclude the password field when converting to JSON
AdminSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

AdminSchema.methods.isAdminExist = async function (phoneNumber: string): Promise<Pick<IAdmin, '_id' | 'role' | 'password' > | null> {
  // check user is exist or not
  const user = await Admin.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
  return user;
};


AdminSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  console.log(givenPassword, savedPassword)
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);
  console.log(isPasswordMatched, 'password matched')
  return isPasswordMatched;
};


AdminSchema.pre('save', async function (next) {
// hashing user password
const admin = this;
admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bycrypt_salt_rounds)
);
next();
});


export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);