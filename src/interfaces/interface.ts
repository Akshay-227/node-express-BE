import { Document } from 'mongoose';

export interface IAddress extends Document {
  city: string;
  state: string;
  country: string;
  street: string;
}

export interface IUser extends Document {
  id: string;
  gender: string;
  name: string;
  address: IAddress;
  email: string;
  age: string;
  picture: string;
  createdAt: Date;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface IPagination extends Document {
  total: number;
  limit: number;
  page: number;
  sortBy: string;
  items: IUser[];
}
