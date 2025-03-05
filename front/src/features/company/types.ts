export interface getAssignedCompanyType {
  status: string;
  data: AssignedCompanyType[];
}

export interface AssignedCompanyType {
  _id: string;
  name: string;
  logo?: string;
  permissions: PermissionsTypes;
  is_owner: boolean;
  address?: string;
}

export interface PermissionsTypes {
  admins: boolean;
  analytics: boolean;
  category: boolean;
  products: boolean;
  comments: boolean;
  discounts: boolean;
}
