import mongoose, { Schema } from 'mongoose';
import { IAddress, IUser } from '../interfaces/interface';
import jwt from 'jsonwebtoken'
const addressSchema = new Schema<IAddress>({
  city: { type: String, required: true, trim:true },
  state: { type: String, required: true , trim:true},
  country: { type: String, required: true , trim:true},
  street: { type: String, required: true , trim:true},
});

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique:true, trim:true },
    gender: { type: String, required: true,  trim:true },
    name: { type: String, required: true , trim:true,index: true},
    address: { type: addressSchema, required: true },
    email: { type: String, required: true , trim:true,index: true},
    age: { type: String, required: true , trim:true},
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      address: this.address,
      gender: this.gender,
      age: this.age,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      address: this.address,
      gender: this.gender,
      age: this.age,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
    }
  );
};

export const User = mongoose.model<IUser>('User', userSchema);

