
import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICow, ICowFilter } from "./cow.interface";
import { Cow } from "./cow.model";
import { cowsSearchableFields } from "./cow.constant";

const createCow = async(payload:ICow): Promise<ICow> => {
    const result = await Cow.create(payload);
    return result;
}


const getAllCow = async(filters : ICowFilter, paginationOptions : IPaginationOptions): Promise<IGenericResponse<ICow[]>> => {

   const {searchTerm,  ...filtersData} = filters;
   /* console.log(filtersData); */
   const andConditions = [];
   // dynamic searching
   if(searchTerm){
    andConditions.push({
        $or: cowsSearchableFields.map((field)=> {
            return {
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }
        })
    })
   }

  const { minPrice, maxPrice, location } = filtersData;

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
  } else {
    if (minPrice !== undefined) {
      andConditions.push({ price: { $gte: minPrice } });
    }
    if (maxPrice !== undefined) {
      andConditions.push({ price: { $lte: maxPrice } });
    }
  }

  if (location !== undefined) {
    andConditions.push({ location: location });
  }

   const {page , limit, skip, sortBy, sortOrder} = PaginationHelper.calculatePagination(paginationOptions);
   
   // dynamic sort condition (it will return a object with key-value pair)
   const sortConditions : {[key: string]: SortOrder} = {}

   if(sortBy && sortOrder){
    sortConditions[sortBy] = sortOrder;
   }

   const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
   whereConditions.$and?.map(item => console.log(item))

   const result = await Cow.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);


   // calculating total with countDocuments() method
   const total = await Cow.countDocuments()

   return {
        meta : {
            page, 
            limit,
            total,
        },
        data: result
   };
}

const getSingleCow = async(id: string ): Promise<ICow | null>=> {
  const result = await Cow.findById(id);
  return result;
}

const updateSingleCow = async(id: string , payload: Partial<ICow>): Promise<ICow | null>=> {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
  }


const deleteSingleCow = async(id: string ): Promise<ICow | null>=> {
  const result = await Cow.findByIdAndDelete(id);
  return result;
}

export const CowServices = {
    createCow,
    getAllCow,
    getSingleCow,
    updateSingleCow,
    deleteSingleCow
}