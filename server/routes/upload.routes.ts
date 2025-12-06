import express from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

// Upload image - requires authentication
router.post('/image', authenticate, upload.single('file'), uploadImage);

// Delete image - requires authentication
router.delete('/image', authenticate, deleteImage);

export default router;
