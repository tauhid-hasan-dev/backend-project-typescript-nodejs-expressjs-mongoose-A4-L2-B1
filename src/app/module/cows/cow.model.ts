import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { cowBreeds, cowCategories, cowLocations } from "./cow.constant";


const cowSchema = new Schema<ICow, CowModel>({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        enum: cowLocations,
        required: true
    },
    breed: {
        type: String,
        enum: cowBreeds,
        required: true
    },
    weight:{ type: Number, required: true},
    label: { type: String, required: true},
    category:
        { 
        type: String, 
        enum: cowCategories, 
        required: true
        },
    seller:{ type: String, required: true},
  },
  {
    timestamps: true,  
  }
  );


  export const Cow = model<ICow, CowModel>('Cow', cowSchema);

  