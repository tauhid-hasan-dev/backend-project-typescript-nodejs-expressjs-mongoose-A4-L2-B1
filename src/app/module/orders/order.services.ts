
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cows/cow.model";
import { User } from "../users/user.model";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";
import mongoose from "mongoose";
/* import { ICow } from "../cows/cow.interface"; */
/* import mongoose from "mongoose"; */


const createOrder = async(order:IOrder):Promise<IOrder | null> => {
    const cowId = order.cow;
    const buyerId = order.buyer;
    // getting cow document
    const isCowExists = await Cow.findById(cowId);
    const sellerId = isCowExists?.seller;
    
    // getting buyer document
    const isBuyerExists = await User.findById(buyerId)

    if(!isBuyerExists || !isCowExists){
        throw new ApiError(httpStatus.NOT_FOUND, 'Failed, buyer or cow not found')
    }

    if(isBuyerExists.budget < isCowExists.price){
        throw new ApiError(httpStatus.EXPECTATION_FAILED, `You need an additional ${isCowExists.price - isBuyerExists.budget} BDT to buy this cow`)
    }
    
    let newOrder = null;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const remainedBuyerMoney = isBuyerExists.budget - isCowExists.price;
        
        // Change the cow's label from 'for sale' to 'sold out'.
        await Cow.findOneAndUpdate( {_id: cowId} , {label: "sold out"});

        // Deduct the cost of the cow from the buyer's budget
        await User.findOneAndUpdate( {_id: buyerId} , {budget: remainedBuyerMoney});

        // Put the same amount of cost into the seller's income
        await User.findOneAndUpdate( {_id: sellerId} , {income: isCowExists.price});
        
        // Make an entry in the orders collection
        const createdOrder = await Order.create([order], {session})
        newOrder = createdOrder[0];

        await session.commitTransaction();
        await session.endSession();

    }catch(error){
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if(newOrder){
        newOrder = await Order.findOne({_id: newOrder._id}).populate('cow').populate('buyer')
    }

    return newOrder;
}

const getAllOrder = async(): Promise<IOrder[] | null>=> {
    const result = await Order.find().populate('cow').populate('buyer');
    return result;
}


export const OrderServices = {
   createOrder,
   getAllOrder
}