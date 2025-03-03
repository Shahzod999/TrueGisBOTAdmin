import { singleCategoryType } from "./categoryTypes";

export interface FoodBoxType {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageThumbnail: string;
  category_id: string;
  weight: string;
  price: string;
  currency: string;
  active: boolean;
  created_by: string;
  created_at: number;
  deleted: boolean;
  updated_at: number;
  updated_by: string;
  category: singleCategoryType;
  discount: any;
}
