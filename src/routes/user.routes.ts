import { Router } from 'express';
import registerUser from '../controllers/user.controller';
import { imageUploadMiddleware, convertImageToBase64 } from '../middlewares/multer.middleware';

const router = Router();

// Apply the middlewares to the "/register" route
router.route('/register').post(imageUploadMiddleware, convertImageToBase64, registerUser);

export default router;
