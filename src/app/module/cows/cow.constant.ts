import { IBreeds, ICategory, ILocations } from "./cow.interface";

export const cowLocations: ILocations[] = ["Dhaka" , "Chattogram" , "Barishal" , "Rajshahi" , "Sylhet" , "Comilla" , "Rangpur" , "Mymensingh"]

export const cowBreeds: IBreeds[] = ["Brahman" , "Nellore" , "Sahiwal" , "Gir" , "Indigenous" , "Tharparkar" , "Kankrej"]
export const cowCategories: ICategory[] = ["Dairy" , "Beef" , "Dual Purpose"]
export const cowsSearchableFields = ['location', 'breed', 'category'];