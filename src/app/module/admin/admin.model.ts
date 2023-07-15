import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";

const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
    phoneNumber: { type: String, required: true , unique: true},
    role: { type: String, enum: ['admin'], required: true },
    password: { type: String, required: true ,  select: 0,},
    name: {
        type: {
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          }
        },
        required: true,
      },
    address: { type: String, required: true },
  },
{
timestamps: true,
} 
);

 /*  AdminSchema.pre('save', async function (next) {
    // hashing user password
    const admin = this;
    admin.password = await bcrypt.hash(
      admin.password,
      Number(config.bycrypt_salt_rounds)
    );
    next();
  }); */


export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);