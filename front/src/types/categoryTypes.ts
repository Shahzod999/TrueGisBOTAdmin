export interface getCategoryType {
  status: string;
  data: singleCategoryType[];
  pagination: PaginationType;
}

export interface singleCategoryType {
  _id: string;
  name: string;
  image?: string;
  imageThumbnail?: string;
  created_by: string;
  created_at: number;
  deleted: boolean;
  updated_at?: number;
  updated_by?: string;
}

export interface PaginationType {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
