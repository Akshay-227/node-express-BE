import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
});

const itemsSchema = new Schema({
  id: { type: String, required: true },
  gender: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: addressSchema, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  picture: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Items = mongoose.model('Items', itemsSchema);

const paginationSchema = new Schema<IPagination>({
  total: { type: Number, required: true },
  limit: { type: Number, required: true },
  page: { type: Number, required: true },
  sortBy: { type: String, required: true },
  items: [{ type: itemsSchema, required: true }],
});

const Pagination = mongoose.model('Pagination', paginationSchema);

export { Items, Pagination };
