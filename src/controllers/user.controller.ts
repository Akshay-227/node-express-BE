import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';
import multer from 'multer';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

// Set up multer storage to keep files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'User with email or username already exists');
    }

    // Create user object - create entry in DB
    const newUser = new User({
      id,
      gender,
      name,
      address: { city, state, country, street },
      email,
      age,
      picture,
    });
    await newUser.save();

    // Remove unnecessary data for response (if needed)
    const responseData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
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

export default registerUser;
