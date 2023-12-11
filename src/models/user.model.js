import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken'

const addressSchema = new Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
});

const userSchema = new Schema({
  id: { type: String, required: true },
  gender: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: addressSchema, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  picture: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{timeStamps:true});

export const User = mongoose.model('User', userSchema);

const paginationSchema = new Schema({
  total: { type: Number, required: true },
  limit: { type: Number, required: true },
  page: { type: Number, required: true },
  sortBy: { type: String, required: true },
  items: [{ type: itemsSchema, required: true }],
},{timeStamps:true});

userSchema.methods.generateAccessToken=function(){
  jwt.sign({_id:this._id, 
    email:this.email,
    name:this.name,
    address:this.address,
    gender:this.gender,
    age:this.age
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken=function(){
  jwt.sign({_id:this._id, 
    email:this.email,
    name:this.name,
    address:this.address,
    gender:this.gender,
    age:this.age
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const Pagination = mongoose.model('Pagination', paginationSchema);

