import { Model, Types } from 'mongoose';
import { ICow } from "../cows/cow.interface";
import { IUser } from '../users/user.interface';

export type IOrder = {
     cow : Types.ObjectId | ICow | any,
     buyer : Types.ObjectId | IUser,
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;
