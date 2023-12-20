import { IPagination } from '../interfaces/interface';
import { User } from '../models/user.model';

const getUsersWithPagination = async (pagination: IPagination, searchBy: string) => {
  const { limit, page, sortBy } = pagination;
  const skip = (page - 1) * limit;

  const globalSearchFields = ['name', 'email', 'age', 'gender', 'dob', 'country'];

  // Dynamic global search query
  const globalSearchQuery = searchBy && {
    $or: globalSearchFields.map((field) => ({
      [field]: new RegExp(searchBy, 'i')
    }))
  };

  const filter: any = globalSearchQuery || {};

  const users = await User.find(filter)
    .sort({ [sortBy]: 1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  return { total, items: users };
};

const createUser = async (userData: any) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

const findUserByIdOrEmail = async (id: string, email: string) => {
  return User.findOne({ $or: [{ id }, { email }] });
};

export { getUsersWithPagination, createUser, findUserByIdOrEmail };
