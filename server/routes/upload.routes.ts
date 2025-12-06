import express from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Upload image - requires authentication
router.post('/image', authenticate, upload.single('file'), uploadImage);

// Delete image - requires authentication
router.delete('/image', authenticate, deleteImage);

export default router;
