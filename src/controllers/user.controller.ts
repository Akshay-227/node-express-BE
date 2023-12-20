import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { IPagination } from '../interfaces/interface';
import { getUserData, registerNewUser } from '../services/user.service';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Get user details from the request
    const {
      id,
      gender,
      name,
      address: { city, state, country, street },
      email,
      age,
      picture,
    } = req.body;

    // Validation (Add your validation logic here)
    if ([name, email, age, gender].some((field) => !field?.trim())) {
      throw new ApiError(400, 'All fields are required');
    }

    // Create user object - register user through service
    const registeredUser = await registerNewUser({
      id,
      gender,
      name,
      address: { city, state, country, street },
      email,
      age,
      picture,
    });

    // Remove unnecessary data for response (if needed)
    const responseData = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      picture: registeredUser.picture,
      // Add other necessary fields as needed
    };
    console.log(responseData);

    // Check for user creation
    res.status(200).json(new ApiResponse(200, responseData, 'User registered successfully'));
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
    } else {
      console.error('Error registering user:', error);
      res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
    }
  }
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const pagination: IPagination = {
      total: 0,
      limit: parseInt(req.query.limit as string, 10) || 10,
      page: parseInt(req.query.page as string, 10) || 1,
      sortBy: req.query.sortBy as string || '_id',
      items: [],
    };

    // Use the query parameter directly without parsing
    // Ensure that searchBy is a string
    const searchBy = req.query.searchBy as string || '';
    const users = await getUserData(pagination, searchBy);

    pagination.total = users.total;
    pagination.items = users.items;

    res.json(new ApiResponse(200, pagination, 'User data retrieved successfully'));
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { registerUser, getUsers };
