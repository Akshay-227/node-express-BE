import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  // get user details from request

  // validation

  // check if user already exists

  // check for images, check for avatar

  // upload them to cloudinary

  // create user object - create entry in DB

  // remove unnecessary data for response

  // check for user creation

  // return response
});

export default registerUser;
