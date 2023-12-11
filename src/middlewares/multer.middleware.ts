import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

// Set up multer storage to keep files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Custom Multer middleware to process the uploaded image
const imageUploadMiddleware = upload.single('picture');

const convertImageToBase64 = async (req: Request, _: Response, next: NextFunction) => {
    try {
      const pictureBuffer: Buffer | undefined = (req.file as Express.Multer.File)?.buffer;
  
      if (!pictureBuffer) {
        throw new Error('No image uploaded');
      }
  
      req.body.picture = pictureBuffer.toString('base64');
  
      next();
    } catch (error) {
      next(error);
    }
  };
  

export { imageUploadMiddleware, convertImageToBase64 };
