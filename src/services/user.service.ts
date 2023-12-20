import { IPagination } from '../interfaces/interface';
import { getUsersWithPagination, createUser, findUserByIdOrEmail } from '../repositories/user.repository';
import { ApiError } from '../utils/ApiError';

const getUserData = async (pagination: IPagination, searchBy: string) => {
  return getUsersWithPagination(pagination, searchBy);
};

const registerNewUser = async (userData: any) => {
  const { id, email } = userData;

  // Check if user with the same ID or email already exists
  const existingUser = await findUserByIdOrEmail(id, email);

  if (existingUser) {
    throw new ApiError(409, 'User with the same ID or email already exists');
  }

  // Create user object - create entry in DB
  const newUser = await createUser(userData);

  // Return the registered user data
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    picture: newUser.picture,
    // Add other necessary fields as needed
  };
};

export { getUserData, registerNewUser };
