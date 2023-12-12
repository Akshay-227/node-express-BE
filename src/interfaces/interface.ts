export interface IAddress {
  city: string;
  state: string;
  country: string;
  street: string;
}

export interface IUser {
  id: string;
  gender: string;
  name: string;
  address: IAddress;
  email: string;
  age: string;
  picture: string;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  sortBy: string;
  items?: IUser[];
}
