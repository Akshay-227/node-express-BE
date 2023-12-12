import { Router } from 'express';
import {registerUser,getUsers} from '../controllers/user.controller';
import { imageUploadMiddleware, convertImageToBase64 } from '../middlewares/multer.middleware';

const router = Router();

// Apply the middlewares to the "/register" route
router.route('/register').post(imageUploadMiddleware, convertImageToBase64, registerUser);

router.route('/getUsers').get(getUsers);

export default router;
