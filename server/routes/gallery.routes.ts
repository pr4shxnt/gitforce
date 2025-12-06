import express from 'express';
import { getAllGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/gallery.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { canModify } from '../middlewares/role.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllGalleryItems);

// Protected routes - Admin/Superuser only
router.post('/', authenticate, canModify, createGalleryItem);
router.put('/:id', authenticate, canModify, updateGalleryItem);
router.delete('/:id', authenticate, canModify, deleteGalleryItem);

export default router;
