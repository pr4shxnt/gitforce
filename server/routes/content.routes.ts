import express from 'express';
import { getContentByPage, getContentBySection, createOrUpdateContent, deleteContent } from '../controllers/content.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { canModify } from '../middlewares/role.middleware';

const router = express.Router();

// Public routes
router.get('/page/:page', getContentByPage);
router.get('/page/:page/section/:section', getContentBySection);

// Protected routes - Admin/Superuser only
router.post('/', authenticate, canModify, createOrUpdateContent);
router.delete('/:id', authenticate, canModify, deleteContent);

export default router;
